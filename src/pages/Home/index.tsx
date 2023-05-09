import React, { FC } from "react";
import { fetchServerLog } from "../../api/api.js";
import Modal from "../../components/Modal";
import "./styles.css";
const Home: FC = () => {
  async function fetchData() {
    const data = await fetchServerLog();
    console.log({ data });
  }

  fetchData();

  return (
    <>
      <div className="home">
        <Modal />
      </div>
    </>
  );
};
export default Home;
