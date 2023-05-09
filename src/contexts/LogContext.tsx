import React, { createContext, useState } from "react";
import { IContextProps, ILogType } from "../types/LogContextTypes";

type PropsLogContext = {
  state: ILogType;
  setState: React.Dispatch<React.SetStateAction<ILogType>>;
};

const DEFAULT_VALUE: PropsLogContext = {
  state: { data: {} as ILogType["data"] },
  setState: () => {},
};

const LogContext = createContext<PropsLogContext>(DEFAULT_VALUE);

const LogContextProvider: React.FC<IContextProps> = ({ children }) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);

  return (
    <LogContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

export { LogContextProvider };
export default LogContext;
