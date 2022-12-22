import React from "react";
import styles from "./Content.module.css";
import { ReportForProductLine } from "../pages/Statistics";

const Content = () => {
  return (
    <div className={styles.container}>
      <ReportForProductLine />
    </div>
  );
};

export default Content;
