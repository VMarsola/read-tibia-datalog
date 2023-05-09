import React, { createContext, useState } from "react";
import { IStepType } from "../types/stepContextTypes";

type PropsStepContext = {
  state: IStepType;
  setState: React.Dispatch<React.SetStateAction<IStepType>>;
};

const DEFAULT_VALUE: PropsStepContext = {
  state: {
    stepIndex: 0,
    data: [],
    response: [],
  },
  setState: () => {},
};

const StepContext = createContext<PropsStepContext>(DEFAULT_VALUE);

const StepContextProvider: React.FC<IContextProps> = ({ children }) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);

  const removeItem = (id: string) => {
    setState({
      ...state,
      data: state.data.filter((item) => item.uniqueiD !== id),
    });
  };

  const reset = () => {
    setState(DEFAULT_VALUE.state);
  };

  return (
    <StepContext.Provider
      value={{
        state,
        setState,
        removeItem,
        reset,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export { StepContextProvider };
export default StepContext;
