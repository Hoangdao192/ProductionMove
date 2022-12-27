import React from "react";
import styles from "./TagError.module.css";

function TagError({ title, percent, value, color }) {
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: color,
        boxShadow: color + " 0px 10px 30px 0px",
      }}
    >
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>
        {percent === "p" ? (
          Math.floor((value[0] / value[1]) * 10000) / 100 + "%"
        ) : (
          <div>
            {value[0]}
            <div className={styles.valueProduct}> sản phẩm</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TagError;
