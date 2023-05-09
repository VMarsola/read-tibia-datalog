import { Routes, Route, Outlet } from "react-router-dom";

import PageLayout from "./components/PageLayout";
import Home from "./pages/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
