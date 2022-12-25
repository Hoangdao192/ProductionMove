import React from "react";
import styles from "./Content.module.css";
import { AlalysisOfProducts } from "../pages/Statistics";

const Content = () => {
  return (
    <div className={styles.container}>
      <AlalysisOfProducts />
    </div>
  );
};

export default Content;
