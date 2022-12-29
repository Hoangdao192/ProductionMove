import React, { useState, useEffect } from "react";
import styles from "./StaticAgency.module.css";

import { statusProduct, sellProduct, sellProductByLine } from "./data";
import SingleBarChar from "./BarChar.js/SingleBarChar";
import LineChartSingle from "./LineChartSingle/LineChartSingle";
import { Title } from "../../../components/common";
import { UilBuilding } from "@iconscout/react-unicons";

function StaticAgency() {
  // const [optionMan, setOptionMan] = useState("mounth");
  const [optionWarranty, setOptionWarranty] = useState("mounth");
  const [optionQuantityProductLine, setOptionQuantityProductLine] =
    useState("mounth");
  const [sizeLabelStatusChart, setSizeLabelStatusChart] = useState(10);
  const [sizeTitle, setSizeTitle] = useState(18);
  const [positionLabelChartLine] = useState("right");

  const changeSizeLabelChart = () => {
    if (window.innerWidth <= 750 && sizeLabelStatusChart !== 6) {
      setSizeLabelStatusChart(10);
      setSizeTitle(12);
    }
  };

  const changeSizeLabelChart2 = () => {
    if (window.innerWidth > 750 && sizeLabelStatusChart !== 10) {
      setSizeLabelStatusChart(10);
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
      <Title icon={[{ icon: UilBuilding }]} title="Đại lý bán hàng" />
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
            sizeLabels={sizeLabelStatusChart}
            sizeTitle={sizeTitle}
            percent
          />
        </div>
        {/* <div className={styles.factoryBarChart}>
          <div className={styles.tbOption}> */}
        {/* <label htmlFor="op">Tùy chọn</label> */}
        {/* <select
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
            percent
          />
        </div> */}
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
              name="optionQuantityProductLine"
              id="optionQuantityProductLine"
              value={optionQuantityProductLine}
              onChange={(e) => {
                setOptionQuantityProductLine(e.target.value);
              }}
            >
              <option value="mounth">Tháng</option>
              <option value="quarter">Quý</option>
              <option value="year">Năm</option>
            </select>
          </div>
          {/* {console.log(optionQuantityProductLine)} */}
          <LineChartSingle
            title={"Sản phẩm bán theo từng dòng"}
            dataList={sellProductByLine}
            type={optionQuantityProductLine}
            sizeLabels={sizeLabelStatusChart}
            sizeTitle={sizeTitle}
            positionLabels={positionLabelChartLine}
          />
        </div>
      </div>
    </div>
  );
}

export default StaticAgency;
