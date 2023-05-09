import { FC } from "react";
import ReactDOM from "react-dom";

const Loader: FC = () => {
  return ReactDOM.createPortal(
    <>
      <>Calculando</>
    </>,
    document.body
  );
};

export default Loader;
