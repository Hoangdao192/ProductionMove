import React from "react";
import styles from "./StaticOperator.module.css";

import {
  statusProduct,
  fatoryProduct,
  warrantyProduct,
  agencyProduct,
} from "./data";
import SingleBarChar from "./BarChar.js/SingleBarChar";
import { Title } from "../../../components/common";
import { UilShutter } from "@iconscout/react-unicons";

function StaticOperator() {
  return (
    <div className={styles.container}>
      <Title icon={[{ icon: UilShutter }]} title="Ban điều hành" />
      <div className={styles.line_1}>
        <div className={styles.statusBarChart}>
          <SingleBarChar
            title={"Sản phẩm từng trạng thái"}
            dataList={statusProduct}
            percent
          />
        </div>
        <div className={styles.factoryBarChart}>
          <SingleBarChar
            title={"Sản phẩm từng nhà sản xuất"}
            dataList={fatoryProduct}
            percent
          />
        </div>
      </div>
      <div className={styles.line_2}>
        <div className={styles.warrantyBarChart}>
          <SingleBarChar
            title={"Sản phẩm từng cơ sở bảo hành"}
            dataList={warrantyProduct}
            percent
          />
        </div>
        <div className={styles.agencyBarChart}>
          <SingleBarChar
            title={"Sản phẩm từng đại lý"}
            dataList={agencyProduct}
            percent
          />
        </div>
      </div>
    </div>
  );
}

export default StaticOperator;
