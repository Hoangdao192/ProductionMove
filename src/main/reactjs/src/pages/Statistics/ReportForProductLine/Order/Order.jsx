import React from "react";
import styles from "./Order.module.css";

function Order() {
  return (
    <div className={styles.container}>
      <div className={styles.item_1}>
        <div className={styles.contain}>
          {/* <div className={styles.orderNumber}>1</div> */}
          <div className={styles.details}>
            <p className={styles.numOfProduct}>
              <span>Số lượng sản phẩm</span>{" "}
              <span className={styles.num}>120</span>
            </p>
            <p className={styles.nameOfProduct}>
              <span>Tên sản phẩm</span>
              <span className={styles.name}>product line 0</span>
            </p>
          </div>
        </div>
        <div className={styles.icon}>
          <img
            src={require("../../../../../asset/icon/first_icon.png")}
            alt="first product"
          />
        </div>
      </div>
      <div className={styles.item_2}>
        <div className={styles.contain}>
          {/* <div className={styles.orderNumber}>1</div> */}
          <div className={styles.details}>
            <p className={styles.numOfProduct}>
              <span>Số lượng sản phẩm</span>{" "}
              <span className={styles.num}>120</span>
            </p>
            <p className={styles.nameOfProduct}>
              <span>Tên sản phẩm</span>{" "}
              <span className={styles.name}>product line 0</span>
            </p>
          </div>
        </div>
        <div className={styles.icon}>
          <img
            src={require("../../../../../asset/icon/second_icon.png")}
            alt="first product"
          />
        </div>
      </div>
      <div className={styles.item_3}>
        <div className={styles.contain}>
          {/* <div className={styles.orderNumber}>1</div> */}
          <div className={styles.details}>
            <p className={styles.numOfProduct}>
              <span>Số lượng sản phẩm</span>{" "}
              <span className={styles.num}>120</span>
            </p>
            <p className={styles.nameOfProduct}>
              <span>Tên sản phẩm</span>{" "}
              <span className={styles.name}>product line 0</span>
            </p>
          </div>
        </div>
        <div className={styles.icon}>
          <img
            src={require("../../../../../asset/icon/third_icon.png")}
            alt="first product"
          />
        </div>
      </div>
    </div>
  );
}

export default Order;
