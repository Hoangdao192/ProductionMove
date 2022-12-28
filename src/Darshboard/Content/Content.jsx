import React from "react";
import styles from "./Content.module.css";
import {
  AlalysisOfProducts,
  ReportForProductLine,
  ErrorProducts,
  FactoryExport,
  StaticOperator,
} from "../pages/Statistics";

const Content = () => {
  return (
    <div className={styles.container}>
      <StaticOperator />
    </div>
  );
};

export default Content;
