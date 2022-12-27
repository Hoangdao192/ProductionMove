import React from "react";
import styles from "./ErrorProducts.module.css";

import { navData } from "./data";
import { Title, Navigation } from "../../../components/common";
import { UilFileTimesAlt } from "@iconscout/react-unicons";

import Table from "./Table/Table";

function ErrorProducts() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Title
          icon={[{ icon: UilFileTimesAlt }]}
          title={"Thống kê sản phẩm lỗi"}
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

export default ErrorProducts;
