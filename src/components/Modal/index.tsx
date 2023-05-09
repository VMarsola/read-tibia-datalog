import React, { FC } from "react";
import "./styles.css";
const Modal: FC = () => {
  return (
    <div className="modal">
      <h2>Quest Log</h2>

      <div className="wrapper">
        <div className="row">
          <p className="item">Hitpoints Healed: 200</p>
          <p className="item">Hitpoints Healed: 200</p>
        </div>

        <div className="box item">
          <div className="row">
            <p>Damage Taken: 356</p>
          </div>
          <div className="row">
            <p>Cyclops: 25</p>
            <p>Dragon: 25</p>
          </div>
        </div>

        <div className="box item">
          <p>Loot</p>
          <div className="row">
            <p>Gold: 25</p>
            <p>Hatchet: 2</p>
            <p>Strong health potion : 2</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
