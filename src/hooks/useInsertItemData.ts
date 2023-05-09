import { useState, useContext } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import StepContext from "../contexts/StepContext";
import { calculateCans, calculateArea } from "../api/calculator";

export default function useInputData() {
  const { state, setState } = useContext(StepContext);

  const [loading, setloading] = useState(false);
  const [calcErrors, setcalcErrors] = useState("");

  const schema = z.object({
    width: z
      .string()
      .nonempty("largura é um campo requerido")
      .regex(/^[+]?\d*\.?\d+$/, "Insira um número valido")
      .refine(
        (value) => {
          if (value) {
            return Number(value) ? true : false;
          } else return true;
        },
        {
          message: "Insira um número valido",
        }
      )
      .refine((value) => Number(value) >= 0, {
        message: "largura tem que ser maior que 0",
      }),
    height: z
      .string()
      .nonempty("altura é um campo requerido")
      .regex(/^[+]?\d*\.?\d+$/, "Insira um número valido")
      .refine(
        (value) => {
          if (value) {
            return Number(value) ? true : false;
          } else return true;
        },
        {
          message: "Insira um número valido",
        }
      )
      .refine((value) => Number(value) >= 0, {
        message: "Altura tem que ser maior que 0",
      }),

    doors: z
      .string()
      .optional()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            return Number(value) ? true : false;
          } else return true;
        },
        {
          message: "Insira um número valido",
        }
      ),
    windows: z
      .string()
      .optional()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            return Number(value) ? true : false;
          } else return true;
        },
        {
          message: "Insira um número valido",
        }
      ),
  });

  type FormProps = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      height: "",
      width: "",
      windows: "",
      doors: "",
    },
  });

  const onSubmit = (values: FormProps) => {
    setcalcErrors("");

    const { height, width, doors, windows } = values;
    const item = {
      height: Number(height),
      width: Number(width),
      doors: doors ? Number(doors) : 0,
      windows: windows ? Number(windows) : 0,
      uniqueiD: uuidv4(),
    };

    const area = calculateArea([item]);

    const door = 0.8 * 1.9;
    const window = 2 * 1.2;
    const wall = item.height * item.width;
    const doorsArea = item.doors * door;
    const windowArea = item.windows * window;

    if (doorsArea + windowArea > wall / 2) {
      setcalcErrors(
        "A area das portas e janelas não podem ultrapassar 50% da area da parede."
      );
      return "";
    }
    if (doors && item.height < 2.2) {
      setcalcErrors("A altura da parede precisa ser maior.");
      return "";
    }
    if (area > 50) {
      setcalcErrors("A area total não pode ser superior a 50m² ");
      return "";
    }

    setState((prevState) => ({
      ...prevState,
      data: [...prevState.data, item],
    }));

    reset();
  };

  const calculate = () => {
    setcalcErrors("");

    if (!state.data.length) {
      setcalcErrors("Insira um item");
      return null;
    }

    setloading(true);
    setTimeout(() => {
      const res = calculateCans(state.data.filter((item) => item));
      setState((prevState) => ({
        ...prevState,
        response: res,
        stepIndex: prevState.stepIndex + 1,
      }));
      setloading(false);
    }, 1500);
  };

  return {
    loading,
    errors,
    register,
    onSubmit,
    handleSubmit,
    calculate,
    calcErrors,
  };
}
