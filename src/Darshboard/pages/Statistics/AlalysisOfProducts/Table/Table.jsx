import React, { useState, useEffect } from "react";
import styles from "./Table.module.css";

import { TbHead } from "../../../../components/common/Table/TableReport";
import { headDataProduct, dataProduct } from "../data";
import LineChartOrder from "../LineChartOrder/LineChartOrder";

function Table() {
  const [tbOption, setTbOption] = useState("mounth");
  const [headData, setHeadData] = useState(headDataProduct.mounth);
  const [dataChartLine, setDataChartLine] = useState(
    dataProduct.map((item) => {
      return item.mounth;
    })
  );
  const [labelChartLine, setLabelChartLine] = useState(
    headDataProduct.mounth.slice(3, 15)
  );

  // useEffect(() => {
  //   console.log(dataChartLine);
  // }, [dataChartLine]);
  return (
    <div className={styles.container}>
      <div className={styles.firstView}>
        <div className={styles.charLine}>
          <LineChartOrder
            title="Top 3 dòng sản phẩm"
            labelList={labelChartLine}
            dataList={dataChartLine}
            nameList={["product line 0", "product line 1", "product line 2"]}
          />
        </div>
      </div>
      <div className={styles.tbOption}>
        <label htmlFor="op">Tùy chọn</label>
        <select
          name="option"
          id="op"
          value={tbOption}
          onChange={(e) => {
            setTbOption(e.target.value);
            if (e.target.value === "mounth") {
              setHeadData(headDataProduct.mounth);
              setLabelChartLine(headDataProduct.mounth.slice(3, 15));
              let chartLine = [];
              dataProduct.forEach((item, index) => {
                chartLine.push(item.mounth);
              });
              console.log(chartLine.slice(0, 3));
              setDataChartLine(chartLine);
              // console.log(dataProduct);
            } else if (e.target.value === "year") {
              let arr = [];
              const currentYear = new Date().getFullYear();
              headDataProduct.year.forEach((item, index) => {
                if (isNaN(parseInt(item))) {
                  arr = [...arr, item];
                } else {
                  let value = currentYear - (5 - parseInt(item));
                  arr = [...arr, value];
                }
              });
              setHeadData(arr);
              setLabelChartLine(arr.slice(3, 8));
              let chartLine = [];
              dataProduct.forEach((item, index) => {
                chartLine.push(item.year);
              });
              console.log(chartLine.slice(0, 3));
              setDataChartLine(chartLine);
              // console.log(dataProduct);
            } else if (e.target.value === "quarter") {
              setHeadData(headDataProduct.quarter);
              setLabelChartLine(headDataProduct.mounth.slice(3, 7));
              let chartLine = [];
              dataProduct.forEach((item, index) => {
                chartLine.push(item.quarter);
              });
              console.log(chartLine.slice(0, 3));
              setDataChartLine(chartLine);
              // console.log(dataProduct);
            }
          }}
        >
          <option value="mounth">Tháng</option>
          <option value="quarter">Quý</option>
          <option value="year">Năm</option>
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <TbHead data={headData} />
        </thead>
        {/* {console.log(dataProduct)} */}
        {dataProduct.map((item, index) => {
          return (
            <tbody key={index}>
              {tbOption === "quarter" ? (
                <tr key={index} className={styles.rowData}>
                  <td>{index + 1}</td>
                  <td>{item.productId}</td>
                  <td className={styles.name}>{item.name}</td>
                  {item.quarter.map((item, index) => {
                    return <td key={index}>{item}</td>;
                  })}
                  <td>{item.quantity.quarter}</td>
                </tr>
              ) : tbOption === "mounth" ? (
                <tr key={index} className={styles.rowData}>
                  <td>{index + 1}</td>
                  <td>{item.productId}</td>
                  <td className={styles.name}>{item.name}</td>
                  {item.mounth.map((item, index) => {
                    return <td key={index}>{item}</td>;
                  })}
                  <td>{item.quantity.mounth}</td>
                </tr>
              ) : tbOption === "year" ? (
                <tr key={index} className={styles.rowData}>
                  <td>{index + 1}</td>
                  <td>{item.productId}</td>
                  <td className={styles.name}>{item.name}</td>
                  {item.year.map((item, index) => {
                    return <td key={index}>{item}</td>;
                  })}
                  <td>{item.quantity.year}</td>
                </tr>
              ) : null}
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default Table;
