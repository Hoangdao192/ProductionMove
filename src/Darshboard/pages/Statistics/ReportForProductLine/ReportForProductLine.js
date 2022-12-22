import React, { useContext } from "react";
import styles from "./ReportForProductLine.module.css";
import { navData } from "./data";
import { Title, Navigation } from "../../../components/common";
import { UisStar } from "@iconscout/react-unicons-solid";

function ReportForProductLine() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Title icon={[{ icon: UisStar }]} title={"Báo cáo"} />
      </div>
      <div className={styles.nav}>
        <Navigation navData={navData} />
      </div>
      <div className={styles.contain}>Contain</div>
    </div>
  );
}

export default ReportForProductLine;
