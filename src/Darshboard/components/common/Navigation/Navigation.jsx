import React, { useState } from "react";
import styles from "./Navigation.module.css";

function Navigation({ navData }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className={styles.container}>
      {navData.map((item, index) => {
        return (
          <div
            className={
              selected === index
                ? styles.navItem + " " + styles.active
                : styles.navItem
            }
            key={index}
            onClick={() => setSelected(index)}
          >
            <item.icon />
            {item.title}
          </div>
        );
      })}
    </div>
  );
}

export default Navigation;
