import React from "react";
// import styles from "./BarChartList.module.css";

import { BarChart } from "../../../../components/common/Chart";

// const labels = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
// ];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: labels.map(() => Math.random() * 10),
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: labels.map(() => Math.random() * 10),
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

function BarChartList({ title, labelList, dataList, percent }) {
  let labels = [];
  let dataSet = [];

  if (title === "Nhà phân phối") {
    labels = dataList.distributors;
    dataSet = [
      {
        label: "Sản phẩm lỗi",
        data: dataList.error,
        backgroundColor: "rgba(250,58,47, 0.8)",
      },
      {
        label: "Sản phẩm tốt",
        data: dataList.error
          ? dataList.error.map((item, index) => {
              return dataList.total[index] - item;
            })
          : [],
        backgroundColor: "rgb(10,149,255)",
      },
    ];
    // console.log(labels);
  }

  if (title === "Nhà sản xuất") {
    labels = dataList.facories;
    dataSet = [
      {
        label: "Sản phẩm lỗi",
        data: dataList.error,
        backgroundColor: "rgba(250,58,47, 0.8)",
      },
      {
        label: "Sản phẩm tốt",
        data: dataList.error
          ? dataList.error.map((item, index) => {
              return dataList.total[index] - item;
            })
          : [],
        backgroundColor: "rgb(10,149,255)",
      },
    ];
  }

  if (title === "Sản phẩm") {
    labels = dataList.productLine;
    dataSet = [
      {
        label: "Sản phẩm lỗi",
        data: dataList.error,
        backgroundColor: "rgba(250,58,47, 0.8)",
      },
      {
        label: "Sản phẩm tốt",
        data: dataList.error
          ? dataList.error.map((item, index) => {
              return dataList.total[index] - item;
            })
          : [],
        backgroundColor: "rgb(10,149,255)",
      },
    ];
  }

  return <BarChart title={title} labelList={labels} dataList={dataSet} />;
}

export default BarChartList;
