import React, { useState } from "react";
import styles from "./StaticWarranty.module.css";

import { statusProduct, warrantyProduct } from "./data";
import SingleBarChar from "../StaticWarranty/BarChar.js/SingleBarChar";

function StaticWarranty() {
  const [optionWarranty, setOptionWarranty] = useState("mounth");

  return (
    <div className={styles.container}>
      <div className={styles.line_1}>
        <div className={styles.statusBarChart}>
          <div className={styles.tbOption}>
            {/* <label htmlFor="op">Tùy chọn</label> */}
            <select></select>
          </div>
          <SingleBarChar
            title={"Sản phẩm từng trạng thái"}
            dataList={statusProduct}
            positionLabels={"right"}
            sizeLabels={8}
            percent
          />
        </div>
        <div className={styles.warrantyBarChart}>
          <div className={styles.tbOption}>
            {/* <label htmlFor="op">Tùy chọn</label> */}
            <select
              name="optionWarranty"
              id="optionWarranty"
              value={optionWarranty}
              onChange={(e) => {
                setOptionWarranty(e.target.value);
              }}
            >
              <option value="mounth">Tháng</option>
              <option value="quarter">Quý</option>
              <option value="year">Năm</option>
            </select>
          </div>
          <SingleBarChar
            title={"Sản phẩm đã bảo hành"}
            dataList={warrantyProduct}
            type={optionWarranty}
            positionLabels={"right"}
            sizeLabels={10}
            percent
          />
        </div>
      </div>
    </div>
  );
}

export default StaticWarranty;
