import React, { useState, useEffect } from "react";
import styles from "./StaticFactory.module.css";

import {
  statusProduct,
  manufacturingProduct,
  sellProduct,
  errorProduct,
} from "./data";
import SingleBarChar from "./BarChar/SingleBarChar.js";
import { Title } from "../../../components/common";
import { UilBuilding } from "@iconscout/react-unicons";

function StaticFactory() {
  const [optionMan, setOptionMan] = useState("mounth");
  const [optionWarranty, setOptionWarranty] = useState("mounth");
  const [optionErrorProduct, setOptionErrorProduct] = useState("productLine");
  const [sizeLabelStatusChart, setSizeLabelStatusChart] = useState(10);
  const [sizeTitle, setSizeTitle] = useState(18);

  const changeSizeLabelChart = () => {
    if (window.innerWidth <= 750 && sizeLabelStatusChart !== 6) {
      setSizeLabelStatusChart(6);
      setSizeTitle(12);
    }
  };

  const changeSizeLabelChart2 = () => {
    if (window.innerWidth > 750 && sizeLabelStatusChart !== 10) {
      setSizeLabelStatusChart(8);
      setSizeTitle(18);
    }
  };

  useEffect(() => {
    const createEvent = () => {
      window.addEventListener("resize", changeSizeLabelChart);
      window.addEventListener("resize", changeSizeLabelChart2);
      return () => {
        window.removeEventListener("resize", changeSizeLabelChart);
        window.addEventListener("resize", changeSizeLabelChart2);
      };
    };
    createEvent();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <Title icon={[{ icon: UilBuilding }]} title="Cơ sở sản xuất" />
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
            sizeLabels={6}
            sizeTitle={sizeTitle}
            percent
          />
        </div>
        <div className={styles.factoryBarChart}>
          <div className={styles.tbOption}>
            {/* <label htmlFor="op">Tùy chọn</label> */}
            <select
              name="optionManufacturing"
              id="opManufac"
              value={optionMan}
              onChange={(e) => {
                setOptionMan(e.target.value);
              }}
            >
              <option value="mounth">Tháng</option>
              <option value="quarter">Quý</option>
              <option value="year">Năm</option>
            </select>
          </div>
          <SingleBarChar
            title={"Sản phẩm sản xuất"}
            dataList={manufacturingProduct}
            type={optionMan}
            sizeLabels={sizeLabelStatusChart}
            sizeTitle={sizeTitle}
            positionLabels={"right"}
            percent
          />
        </div>
      </div>
      <div className={styles.line_2}>
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
            title={"Sản phẩm đã bán"}
            dataList={sellProduct}
            type={optionWarranty}
            sizeLabels={sizeLabelStatusChart}
            sizeTitle={sizeTitle}
            positionLabels={"right"}
            percent
          />
        </div>
        <div className={styles.agencyBarChart}>
          <div className={styles.tbOption}>
            {/* <label htmlFor="op">Tùy chọn</label> */}
            <select
              name="optionErrorProduct"
              id="optionErrorProduct"
              value={optionErrorProduct}
              onChange={(e) => {
                setOptionErrorProduct(e.target.value);
              }}
            >
              <option value="productLine">Dòng sản phẩm</option>
              <option value="factory">Nhà sản xuất</option>
              <option value="agency">Nhà phân phối</option>
            </select>
          </div>
          <SingleBarChar
            title={"Sản phẩm lỗi"}
            dataList={errorProduct}
            type={optionErrorProduct}
            sizeLabels={sizeLabelStatusChart}
            sizeTitle={sizeTitle}
            positionLabels={"right"}
            percent
          />
        </div>
      </div>
    </div>
  );
}

export default StaticFactory;
