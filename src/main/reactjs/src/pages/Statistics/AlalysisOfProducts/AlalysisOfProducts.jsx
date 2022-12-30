import React from "react";
import styles from "./AlalysisOfProducts.module.css";
import { navData } from "./data";
import { Title, Navigation } from "../../../components/common";
import { UisAnalytics } from "@iconscout/react-unicons-solid";

import Table from "./Table/Table";

function AlalysisOfProducts() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Title
          icon={[{ icon: UisAnalytics }]}
          title={"Thống kê sản phẩm bán ra"}
        />
      </div>
      <div className={styles.nav}>
        <Navigation navData={navData} />
      </div>
      <div className={styles.contain}>
        <Table />
      </div>
    </div>
  );
}

export default AlalysisOfProducts;
