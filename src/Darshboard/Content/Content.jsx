import React from "react";
import styles from "./Content.module.css";
import {
  AlalysisOfProducts,
  ReportForProductLine,
  ErrorProducts,
  FactoryExport,
} from "../pages/Statistics";

const Content = () => {
  return (
    <div className={styles.container}>
      <ErrorProducts />
    </div>
  );
};

export default Content;
