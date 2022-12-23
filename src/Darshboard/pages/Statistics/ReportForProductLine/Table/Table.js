import React, { useState, useEffect } from "react";
import styles from "./Table.module.css";

import { TbHead, TbRow } from "../../../../components/common/Table/TableReport";
import { headDataProductByLine, dataProductByLine } from "../data";
import { DoughnutChart } from "../../../../components/common/Chart";
import Order from "../Order/Order";

function Table() {
  const [tbOption, setTbOption] = useState("status");
  const [headData, setHeadData] = useState(headDataProductByLine.status);
  const [dataChart, setDataChart] = useState(
    dataProductByLine.map((item) => {
      return item.status;
    })
  );
  const [labelChart, setLabelChart] = useState(
    headDataProductByLine.status.slice(3, 15)
  );
  const [indexChart, setIndextChart] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndextChart((indexChart) => {
        if (indexChart + 1 === dataProductByLine.length) {
          return 0;
        }
        return indexChart + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(indexChart);
  }, [indexChart]);

  return (
    <div className={styles.container}>
      <div className={styles.firstView}>
        <div className={styles.chartItem}>
          <DoughnutChart dataChart={dataChart[indexChart]} label={labelChart} />
          <div className={styles.titleChart}>
            {dataProductByLine[indexChart].name}
          </div>
        </div>
        <Order />
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
              setHeadData(headDataProductByLine.mounth);
              setLabelChart(headDataProductByLine.mounth.slice(3, 15));
              setDataChart(
                dataProductByLine.map((item) => {
                  return item.mounth;
                })
              );
            } else if (e.target.value === "year") {
              const currentYear = new Date().getFullYear();
              let arr = [];
              headDataProductByLine.year.forEach((item, index) => {
                if (!isNaN(parseInt(item))) {
                  arr = [...arr, currentYear - parseInt(item)];
                } else {
                  arr = [...arr, item];
                }
              });
              setHeadData(arr);
              setLabelChart(arr.slice(3, 15));
              setDataChart(
                dataProductByLine.map((item) => {
                  return item.year;
                })
              );
            } else if (e.target.value === "status") {
              setHeadData(headDataProductByLine.status);
              setLabelChart(headDataProductByLine.status.slice(3, 15));
              setDataChart(
                dataProductByLine.map((item) => {
                  return item.status;
                })
              );
            }
          }}
        >
          <option value="status">Trạng thái</option>
          <option value="mounth">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <TbHead data={headData} />
        </thead>

        {dataProductByLine.map((item, index) => {
          return (
            <tbody key={index}>
              {tbOption === "status" ? (
                <tr key={index} className={styles.rowData}>
                  <td>{index + 1}</td>
                  <td>{item.productId}</td>
                  <td className={styles.name}>{item.name}</td>
                  {item.status.map((item, index) => {
                    return <td key={index}>{item}</td>;
                  })}
                  <td>{item.quantity.status}</td>
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
