import React, { useState, useEffect } from "react";
import styles from "./Table.module.css";

import { TbHead } from "../../../../components/common/Table/TableReport";
import { headDataProductByLine, dataProductByLine } from "../data";
import { DoughnutChart } from "../../../../components/common/Chart";
import Order from "../Order/Order";

function Table() {
  const [tbOption, setTbOption] = useState("mounth");
  const [headData] = useState(headDataProductByLine.status);
  const [dataChart, setDataChart] = useState(
    dataProductByLine.map((item) => {
      return item.quarter;
    })
  );
  const [labelChart] = useState(headDataProductByLine.status.slice(3, 15));
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
              setDataChart(
                dataProductByLine.map((item) => {
                  return item.mounth;
                })
              );
            } else if (e.target.value === "year") {
              setDataChart(
                dataProductByLine.map((item) => {
                  return item.year;
                })
              );
            } else if (e.target.value === "quarter") {
              setDataChart(
                dataProductByLine.map((item) => {
                  return item.quarter;
                })
              );
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

        {dataProductByLine.map((item, index) => {
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
