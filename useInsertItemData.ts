import { useState, useContext } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import StepContext from "../contexts/StepContext";
import { CONTAINER_SIZES } from "../constants/containers";
import { calculateContainers, calculateVolume } from "../api/calculator";
import { Item } from "../types/shippingTypes";

export default function useInputData() {
  const { state, setState } = useContext(StepContext);

  const [loading, setloading] = useState(false);
  const [calcErrors, setcalcErrors] = useState("");

  const schema = z.object({
    width: z
      .string()
      .nonempty("Width is a required field")
      .regex(/^[+]?\d*.?\d+$/, "Enter a valid number")
      .refine(
        (value) => {
          if (value) {
            return Number(value) ? true : false;
          } else return true;
        },
        {
          message: "Enter a valid number",
        }
      )
      .refine((value) => Number(value) >= 0, {
        message: "Width must be greater than 0",
      }),
    height: z
      .string()
      .nonempty("Height is a required field")
      .regex(/^[+]?\d*.?\d+$/, "Enter a valid number")
      .refine(
        (value) => {
          if (value) {
            return Number(value) ? true : false;
          } else return true;
        },
        {
          message: "Enter a valid number",
        }
      )
      .refine((value) => Number(value) >= 0, {
        message: "Height must be greater than 0",
      }),

    length: z
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
          message: "Enter a valid number",
        }
      ),
    quantity: z
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
          message: "Enter a valid number",
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
      quantity: "",
      length: "",
    },
  });

  const onSubmit = (values: FormProps) => {
    setcalcErrors("");
    const {
      height: valuesHeight,
      width: valuesWidth,
      length: valuesLength,
      quantity: valuesQuantity,
    } = values;

    const item = {
      height: Number(valuesHeight),
      width: Number(valuesWidth),
      length: valuesLength ? Number(valuesLength) : 0,
      quantity: valuesQuantity ? Number(valuesQuantity) : 0,
      uniqueiD: uuidv4(),
    };

    const { height, length, name, width } =
      CONTAINER_SIZES[CONTAINER_SIZES.length - 1];
    const containter: Item = {
      height,
      length,
      quantity: 1,
      width,
    };
    const volume = calculateVolume([item]);
    const maxVolume = calculateVolume([containter]);

    if (volume > maxVolume) {
      setcalcErrors(
        "The volume of this item surpass the volume of our biggest conainer!"
      );
      return false;
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
      const res = calculateContainers(state.data.filter((item) => item));

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
