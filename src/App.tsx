import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { StepContextProvider } from "./contexts/StepContext";
import AppRoutes from "./routes";

import "./styles/global.css";
const App: FC = () => {
  return (
    <Router>
      <StepContextProvider>
        <AppRoutes />
      </StepContextProvider>
    </Router>
  );
};

export default App;
