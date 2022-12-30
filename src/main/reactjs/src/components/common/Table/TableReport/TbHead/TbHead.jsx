import React from "react";
import styles from "./TbHead.module.css";

function TbHead({ data }) {
  return (
    <tr className={styles.TbHead}>
      {data.map((item, index) => {
        return <th key={index}>{item}</th>;
      })}
    </tr>
  );
}

export default TbHead;
