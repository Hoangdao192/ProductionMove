import React from "react";
// import styles from "./BarChar.module.css";

import { BarChart } from "../../../../components/common/Chart";

function SingleBarChar({
  title,
  labelList,
  dataList,
  percent,
  scales,
  positionLabels,
  sizeLabels,
  displayLabels,
  sizeTitle,
}) {
  let labels = [""];
  let dataSet = [];

  const tooltip = {
    callbacks: {
      label: function (context) {
        let label = context.dataset.label || "";

        if (label) {
          label = " " + label + ": ";
        }
        if (context.parsed.y !== null) {
          label += context.parsed.y + " sản phẩm";
        }
        return label;
      },
    },
  };

  if (title === "Thống kê sản phẩm theo trạng thái") {
    // { status: "NEW", quantity: 300, color: "rgb(66, 194, 255)" }
    dataList.forEach((item, index) => {
      dataSet = [
        ...dataSet,
        {
          label: [item.status],
          data: [item.quantity],
          backgroundColor: [item.color],
          hoverBackgroundColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 0.6)",
          borderColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 0.8)",
          borderWidth: 0,
          borderRadius: 5,
        },
      ];
    });

    scales = {
      // x: {
      //   ticks: {
      //     callback: function (value) {
      //       return "$" + value + "m";
      //     },
      //   },
      // },
    };
  }

  if (title === "Thống kê sản xuất sản phẩm") {
    // { status: "NEW", quantity: 300, color: "rgb(66, 194, 255)" }
    dataList.forEach((item, index) => {
      dataSet = [
        ...dataSet,
        {
          label: item.factory,
          data: [item.quantity],
          backgroundColor: [item.color],
          hoverBackgroundColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 0.6)",
          borderColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 0.8)",
          borderWidth: 0,
          borderRadius: 5,
        },
      ];
    });
  }

  if (title === "Thống kê sản phẩm từng cơ sở bảo hành") {
    // { status: "NEW", quantity: 300, color: "rgb(66, 194, 255)" }
    dataList.forEach((item, index) => {
      dataSet = [
        ...dataSet,
        {
          label: item.warranty,
          data: [item.quantity],
          backgroundColor: [item.color],
          hoverBackgroundColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 0.6)",
          borderColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 0.8)",
          borderWidth: 0,
          borderRadius: 5,
        },
      ];
    });
  }

  if (title === "Thống kê sản phẩm từng đại lý") {
    // { status: "NEW", quantity: 300, color: "rgb(66, 194, 255)" }
    dataList.forEach((item, index) => {
      dataSet = [
        ...dataSet,
        {
          label: item.agency,
          data: [item.quantity],
          backgroundColor: [item.color],
          hoverBackgroundColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 0.6)",
          borderColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 0.8)",
          borderWidth: 0,
          borderRadius: 5,
        },
      ];
    });
  }

  return (
    <BarChart
      title={title}
      labelList={labels}
      dataList={dataSet}
      scales={scales}
      tooltip={tooltip}
      positionLabels={positionLabels}
      sizeLabels={sizeLabels}
      displayLabels={displayLabels}
      sizeTitle={sizeTitle}
    />
  );
}

export default SingleBarChar;
