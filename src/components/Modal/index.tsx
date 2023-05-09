import { FC, useContext } from "react";
import "./styles.css";

import useModalData from "../../hooks/useModalData";
import Loader from "../Loader";
import LogContext from "../../contexts/LogContext";

const Modal: FC = () => {
  const { loading } = useModalData();
  const { state } = useContext(LogContext);
  if (loading) return <Loader />;
  const { damageTaken, experienceGained, hitpointsHealed, loot } = state.data;

  return (
    <div className="modal">
      <h2>Quest Log</h2>

      <div className="wrapper">
        <div className="row">
          <p className="item">
            Hitpoints Healed: <b className="text-green">{hitpointsHealed}</b>
          </p>
          <p className="item">
            Experience Gained: <b className="text-green">{experienceGained}</b>
          </p>
        </div>

        <div className="box item">
          <div className="row">
            <p>
              Damage Taken: <b className="text-gold">{damageTaken?.total}</b>
            </p>
          </div>
          <div className="row grid-container">
            {damageTaken &&
              Object.entries(damageTaken?.byCreatureKind).map(
                ([key, value]) => (
                  <p key={key}>
                    {key}: <b className="text-purple">{value}</b>
                  </p>
                )
              )}
          </div>
        </div>

        <div className="box item">
          <p>Loot</p>
          <div className="row grid-container">
            {loot &&
              Object.entries(loot).map(([key, value]) => (
                <p key={key}>
                  {key}: <b className="text-orange">{value}</b>
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
