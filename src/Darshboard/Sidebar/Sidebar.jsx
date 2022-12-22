import React, { useState, useContext } from "react";
import styles from "./Sidebar.module.css";

import { SidebarData } from "./Data";
import { UilSignOutAlt, UilArrowLeft } from "@iconscout/react-unicons";

import { DarshboardContext } from "../../context/DarshboardProvider/DarshboardProvider";

const Sidebar = () => {
  const context = useContext(DarshboardContext);
  const [selected, setSelected] = useState(0);

  const { togleSider, setTogleSider, togleBar, setTogleBar } = context;

  return (
    <div
      className={
        togleBar
          ? togleSider
            ? styles.container + " " + styles.openSide
            : styles.container
          : styles.container
      }
      onClick={() => {
        if (togleBar) {
          setTogleSider(!togleSider);
        }
      }}
    >
      <div className={styles.logo}>
        <div className={styles.logoImg}>
          <img src={require("../../asset/image/logo.jpg")} alt="Logo" />
        </div>
        <div className={togleBar ? styles.backBtn : "nonDisplay"}>
          <UilArrowLeft size={48} />
        </div>
        <div className={styles.avatar}>
          <div className={styles.avatarImg}>
            <img src={require("../../asset/image/avatar.jpg")} alt="Avatar" />
          </div>
          <div className={styles.name}>Xin chào Cường</div>
        </div>
      </div>

      <div className={styles.menu}>
        {SidebarData.map((item, index) => {
          return (
            <div
              className={
                selected === index
                  ? styles.menuItem + " " + styles.active
                  : styles.menuItem
              }
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span className={styles.titleContent}>{item.heading}</span>
              <div className={styles.hover}>{item.heading}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.details}>
        <div className={styles.outBtn}>
          <UilSignOutAlt />
          <span className={styles.titleContent}>Đăng xuất</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
