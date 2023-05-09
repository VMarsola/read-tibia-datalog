import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Outlet />
    </>
  );
};

export default PageLayout;
