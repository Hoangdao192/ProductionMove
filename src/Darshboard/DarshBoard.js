import React, { useContext, useEffect } from "react";
import styles from "./DarshBoard.module.css";

import { DarshboardContext } from "../context/DarshboardProvider/DarshboardProvider";
import { Sidebar } from "./Sidebar";
import { Content } from "./Content";

export default function DarshBoard() {
  const context = useContext(DarshboardContext);

  const { togleBar, setTogleBar } = context;

  const showBarIcon = () => {
    if (
      (window.screen.width <= 750 && togleBar === false) ||
      (window.screen.width <= 750 && togleBar === 0)
    ) {
      setTogleBar(true);
    }
  };

  const hiddenBarIcon = () => {
    if (
      (window.screen.width > 750 && togleBar === true) ||
      (window.screen.width > 750 && togleBar === 0)
    ) {
      setTogleBar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", showBarIcon);
    window.addEventListener("resize", hiddenBarIcon);
    return () => {
      window.removeEventListener("resize", showBarIcon);
      window.removeEventListener("resize", hiddenBarIcon);
    };
  }, []);

  useEffect(() => {
    console.log("togleBar: " + togleBar);
  }, [togleBar]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}
