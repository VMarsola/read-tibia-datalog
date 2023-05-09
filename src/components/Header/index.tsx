import { FC } from "react";
import "./styles.css";

import logo from "../../assets/logo.png";

const Header: FC = () => {
  return <img src={logo} alt="Logo" className="logo" />;
};
export default Header;
