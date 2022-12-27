import React, { useState, useEffect } from "react";
import styles from "./Table.module.css";

import { dataProductError } from "../data";

import TableSigle from "../TableSigle/TableSigle";
import TagError from "../TagError/TagError";
import BarChartList from "../BarChartList/BarChartList";
import { DoughnutChart } from "../../../../components/common/Chart";

function Table() {
  const [percent, setPercent] = useState("p");
  const title = ["Sản phẩm", "Nhà máy", "Nhà phân phối"];

  const [dataCharLine] = useState([
    { title: "Sản phẩm", data: dataProductError.products },
    { title: "Nhà sản xuất", data: dataProductError.factory },
    { title: "Nhà phân phối", data: dataProductError.distributor },
  ]);
  const [indexChartLine, setIndexChartLine] = useState(0);
  const [dataDoughnutChart] = useState({
    productLine: [
      Math.floor(
        (dataProductError.totalErrorProducts / dataProductError.totalProducts) *
          10000
      ) / 100,
      100 -
        Math.floor(
          (dataProductError.totalErrorProducts /
            dataProductError.totalProducts) *
            10000
        ) /
          100,
    ],
    factory: [
      Math.floor(
        (dataProductError.factory.totalErrorProducts /
          dataProductError.factory.totalProducts) *
          10000
      ) / 100,
      100 -
        Math.floor(
          (dataProductError.factory.totalErrorProducts /
            dataProductError.factory.totalProducts) *
            10000
        ) /
          100,
    ],
    distributor: [
      Math.floor(
        (dataProductError.distributor.totalErrorProducts /
          dataProductError.distributor.totalProducts) *
          10000
      ) / 100,
      100 -
        Math.floor(
          (dataProductError.distributor.totalErrorProducts /
            dataProductError.distributor.totalProducts) *
            10000
        ) /
          100,
    ],
  });
  useEffect(() => {
    console.log(dataCharLine);
  }, [dataCharLine]);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndexChartLine((index) => {
        if (index + 1 === 3) {
          return 0;
        }
        return index + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.firstView}>
        <div className={styles.tagError}>
          <TagError
            className={styles.errFactory}
            color={"rgb(252,103,91)"}
            title={"Sản phẩm lỗi"}
            percent={percent}
            value={[
              dataProductError.totalErrorProducts,
              dataProductError.totalProducts,
            ]}
          />
          <TagError
            title={"Nhà sản xuất"}
            color={"rgb(0,208,102)"}
            percent={percent}
            value={[
              dataProductError.factory.totalErrorProducts,
              dataProductError.factory.totalProducts,
            ]}
          />
          <TagError
            title={"Nhà phân phối"}
            color={"rgb(249,195,0)"}
            percent={percent}
            value={[
              dataProductError.distributor.totalErrorProducts,
              dataProductError.distributor.totalProducts,
            ]}
          />
        </div>
        <div className={styles.barChartWapper}>
          <div className={styles.barChart}>
            <BarChartList
              title={dataCharLine[indexChartLine].title}
              labelList={("Sản phẩm", "Lỗi")}
              dataList={dataCharLine[indexChartLine].data}
              percent={percent}
            />
          </div>
        </div>
      </div>

      <div className={styles.secondView}>
        <div className={styles.tableWapper}>
          <div className={styles.tbOption}>
            <label htmlFor="op">Tùy chọn</label>
            <select
              name="option"
              id="op"
              value={percent}
              onChange={(e) => {
                setPercent(e.target.value);
              }}
            >
              <option value={"p"}>Phần trăm</option>
              <option value={"n"}>Số lượng</option>
            </select>
          </div>
          <div className={styles.table}>
            <TableSigle
              type={"product"}
              title={"Dòng sản phẩm"}
              head={["Sản phẩm", "Lỗi"]}
              data={dataProductError.products}
              percent={percent}
            />
            <TableSigle
              type={"factory"}
              title={"Nhà sản xuất"}
              head={["Sản phẩm", "Lỗi"]}
              data={dataProductError.factory}
              percent={percent}
            />
            <TableSigle
              type={"distributor"}
              title={"Nhà phân phối"}
              head={["Sản phẩm", "Lỗi"]}
              data={dataProductError.distributor}
              percent={percent}
            />
          </div>
        </div>

        <div className={styles.DoughnutChartList}>
          <div className={styles.line1}>
            <div className={styles.chart1}>
              <DoughnutChart
                dataChart={dataDoughnutChart.productLine}
                label={["Sản phẩm lỗi", "Sản phẩm tốt"]}
                colors={["rgb(250,100,91)", "rgb(10,149,255)"]}
                legend={true}
                title={title[0]}
              />
            </div>
          </div>
          <div className={styles.line2}>
            <div className={styles.chart2}>
              <DoughnutChart
                dataChart={dataDoughnutChart.factory}
                label={["Sản phẩm lỗi", "Sản phẩm tốt"]}
                colors={["rgb(250,100,91)", "rgb(10,149,255)"]}
                legend={true}
                title={title[1]}
              />
            </div>
            <div className={styles.chart2}>
              <DoughnutChart
                dataChart={dataDoughnutChart.distributor}
                label={["Sản phẩm lỗi", "Sản phẩm tốt"]}
                colors={["rgb(250,100,91)", "rgb(10,149,255)"]}
                legend={true}
                title={title[2]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.totalPercen}>
        <div className={styles.fraction}>
          <div className={styles.up}>Sản phẩm lỗi</div>
          <div className={styles.down}>Sản phẩm</div>
        </div>
        <div className={styles.equal}> = </div>
        <div className={styles.value}>
          {percent === "p" ? (
            <div>
              {Math.floor(
                (dataProductError.totalErrorProducts /
                  dataProductError.totalProducts) *
                  10000
              ) /
                100 +
                "%"}
            </div>
          ) : (
            <div>
              <div className={styles.up}>
                {dataProductError.totalErrorProducts}
              </div>
              <div className={styles.down}>
                {dataProductError.totalProducts}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Table;
