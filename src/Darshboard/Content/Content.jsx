import React from "react";
import styles from "./Content.module.css";
import {
  AlalysisOfProducts,
  ReportForProductLine,
  ErrorProducts,
  FactoryExport,
  StaticOperator,
  StaticFactory,
  StaticAgency,
  StaticWarranty,
} from "../pages/Statistics";

const Content = () => {
  return (
    <div className={styles.container}>
      <StaticWarranty />
    </div>
  );
};

export default Content;
