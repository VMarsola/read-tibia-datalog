import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { LogContextProvider } from "./contexts/LogContext";
import AppRoutes from "./routes";

import "./styles/global.css";
import "./styles/texts.css";
const App: FC = () => {
  return (
    <Router>
      <LogContextProvider>
        <AppRoutes />
      </LogContextProvider>
    </Router>
  );
};

export default App;
