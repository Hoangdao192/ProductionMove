import React from "react";
import styles from "./TableSigle.module.css";

import { TbHead } from "../../../../components/common/Table/TableReport";

function TableSigle({ type, title, head, data, percent }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <table className={styles.table}>
        <thead>
          <TbHead data={head} />
        </thead>
        <tbody>
          {type === "product"
            ? data.productLine.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item}</td>
                    <td>
                      {percent === "p"
                        ? Math.floor(
                            (data.error[index] / data.total[index]) * 10000
                          ) /
                            100 +
                          "%"
                        : data.error[index] + "/" + data.total[index]}
                    </td>
                  </tr>
                );
              })
            : type === "factory"
            ? data.facories.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item}</td>
                    <td>
                      {percent === "p"
                        ? Math.floor(
                            (data.error[index] / data.total[index]) * 10000
                          ) /
                            100 +
                          "%"
                        : data.error[index] + "/" + data.total[index]}
                    </td>
                  </tr>
                );
              })
            : type === "distributor"
            ? data.distributors.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item}</td>
                    <td>
                      {percent === "p"
                        ? Math.floor(
                            (data.error[index] / data.total[index]) * 10000
                          ) /
                            100 +
                          "%"
                        : data.error[index] + "/" + data.total[index]}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default TableSigle;
