import withAuthRedirect from "../HOC/withAuthRedirect";
import "./../../App.css";
import React from "react";

const Devices = () => {
  return (
    <div className="container">
      <div className="center-devices">
        <div className="devices-grid">
          <div className="grid-item">
            <img src="./img/processor.jpg"></img>
            <div className="grid-info">
              <img src="./img/arrow-second-left.png" width="100px"></img>
              <p>Intel Core i9 13900</p>
            </div>
          </div>
          <div className="grid-item">
            <img src="./img/monitor.jpg"></img>
            <div className="grid-info2">
              <img src="./img/arrow-left.png" width="100px"></img>
              <p>ROG Swift 500Hz</p>
            </div>
          </div>
          <div className="grid-item">
            <img src="./img/keyboard.jpg"></img>
            <div className="grid-info3">
              <img src="./img/arrow.png" width="100px"></img>
              <p>HyperX Alloy Origins</p>
            </div>
          </div>
          <div className="grid-item">
            <img src="./img/room.jpeg"></img>
            <div className="grid-info4">
              <img src="./img/arrow-down.png" width="100px"></img>
              <p>
                {window.innerWidth < 733
                  ? " Цветовая гамма!"
                  : "Место с приятной и расслабляющей обстановкой, легкой фоновой музыкой, при которой можно отдохнуть!"}
              </p>
            </div>
          </div>
          <div className="grid-item">
            <img src="./img/armchair.png"></img>
            <div className="grid-info5">
              <img src="./img/arrow-second.png" width="100px"></img>
              <p>
                {window.innerWidth < 733
                  ? "Ergo Quest"
                  : "ErgoQuest Zero Gravity Workstation Ultimate"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const AuthRedirect = withAuthRedirect(Devices);
export default AuthRedirect;
