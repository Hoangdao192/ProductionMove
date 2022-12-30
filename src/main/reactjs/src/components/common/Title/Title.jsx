import React, { useContext } from "react";
import styles from "./Title.module.css";
import { UilBars } from "@iconscout/react-unicons";

import { DarshboardContext } from '../../../context/DarshboardProvider/DarshboardProvider';

function Title({ icon, title, name, avatar }) {
  const context = useContext(DarshboardContext);

  const { togleSider, setTogleSider } = context;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {icon.map((item, index) => {
          const name = item.icon.name;
          return (
            <div className={styles[name]} key={index}>
              <item.icon
                size={
                  name === "UisStar"
                    ? 12
                    : name === "UisAnalytics"
                    ? 30
                    : name === "UilFileTimesAlt"
                    ? 20
                    : name === "UilFileExport"
                    ? 20
                    : name === "UilShutter"
                    ? 30
                    : name === "UilBuilding"
                    ? 30
                    : name === "UilShield"
                    ? 30
                    : 15
                }
              />
            </div>
          );
        })}
        {title}
      </div>
      <div className={styles.avatar}>
        {/* <div className={styles.name}>Xin chào Cường</div>
        <div className={styles.avatarImg}>
          <img
            src={require("../../../../asset/image/avatar.jpg")}
            alt="Avatar"
          />
        </div> */}
        <div
          // className={togleBar ? "" : "nonDisplay"}
          className={styles.barBtn}
          onClick={() => setTogleSider(!togleSider)}
        >
          <UilBars className={styles.bar} size={35} />
        </div>
      </div>
    </div>
  );
}

export default Title;
