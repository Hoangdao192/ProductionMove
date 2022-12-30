import React from "react";
// import styles from "./BarChar.module.css";

import { BarChart } from "../../../../components/common/Chart";

function SingleBarChar({
  title,
  labelList,
  positionLabels,
  sizeLabels,
  dataList,
  percent,
  scales,
  type,
  displayLabels,
  sizeTitle,
}) {
  let labels = [""];
  let dataSet = [];

  let tooltip = {
    callbacks: {
      label: function (context) {
        let label = context.dataset.label || "";

        if (label) {
          label = " " + label + ": ";
        }
        if (context.parsed.y !== null) {
          label += context.parsed.y;
        }
        return label;
      },
    },
  };

  if (title === "Sản phẩm từng trạng thái") {
    labels = [""];
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
          borderWidth: 5,
          borderRadius: 5,
        },
      ];
    });
  }

  if (title === "Sản phẩm sản xuất") {
    // console.log(dataList);
    labels = [];
    if (type === "mounth") {
      dataList.mounth.forEach((item, index) => {
        labels = [...labels, "Tháng " + item.name];
      });
      dataSet = [
        ...dataSet,
        {
          label: "Sản phẩm",
          data: dataList.mounth.map((item, index) => {
            return item.quantity;
          }),
          backgroundColor: dataList.mounth[0].color,
          hoverBackgroundColor:
            "rgba(" +
            dataList.mounth[0].color.substring(
              4,
              dataList.mounth[0].color.length - 1
            ) +
            ", 0.6)",

          borderColor:
            "rgba(" +
            dataList.mounth[0].color.substring(
              4,
              dataList.mounth[0].color.length - 1
            ) +
            ", 0.8)",

          borderWidth: 5,
          borderRadius: 5,
        },
      ];
      scales = {
        x: {
          ticks: {
            callback: function (value) {
              return value + 1;
            },
          },
        },
      };
    }
    if (type === "quarter") {
      dataList.quarter.forEach((item, index) => {
        labels = [...labels, "Quý " + item.name];
      });
      dataSet = [
        ...dataSet,
        {
          label: "Sản phẩm",
          data: dataList.quarter.map((item, index) => {
            return item.quantity;
          }),
          backgroundColor: dataList.quarter[0].color,
          hoverBackgroundColor:
            "rgba(" +
            dataList.quarter[0].color.substring(
              4,
              dataList.quarter[0].color.length - 1
            ) +
            ", 0.6)",

          borderColor:
            "rgba(" +
            dataList.quarter[0].color.substring(
              4,
              dataList.quarter[0].color.length - 1
            ) +
            ", 0.8)",

          borderWidth: 5,
          borderRadius: 5,
        },
      ];
      scales = {
        x: {
          ticks: {
            callback: function (value) {
              return "Quý " + (value + 1);
            },
          },
        },
      };
    }
    if (type === "year") {
      const currentYear = new Date().getFullYear();
      dataList.year.forEach((item, index) => {
        labels = [...labels, currentYear - (5 - parseInt(item.name))];
      });
      dataSet = [
        ...dataSet,
        {
          label: "Sản phẩm",
          data: dataList.year.map((item, index) => {
            return item.quantity;
          }),
          backgroundColor: dataList.year[0].color,
          hoverBackgroundColor:
            "rgba(" +
            dataList.year[0].color.substring(
              4,
              dataList.year[0].color.length - 1
            ) +
            ", 0.6)",

          borderColor:
            "rgba(" +
            dataList.year[0].color.substring(
              4,
              dataList.year[0].color.length - 1
            ) +
            ", 0.8)",

          borderWidth: 5,
          borderRadius: 5,
        },
      ];
      scales = {
        // x: {
        //   ticks: {
        //     callback: function (value) {
        //       return value;
        //     },
        //   },
        // },
      };
    }
  }

  if (title === "Sản phẩm đã bảo hành") {
    // console.log(dataList);
    labels = [];
    if (type === "mounth") {
      dataList.mounth.forEach((item, index) => {
        labels = [...labels, "Tháng " + item.name];
      });
      dataSet = [
        ...dataSet,
        {
          label: "Sản phẩm",
          data: dataList.mounth.map((item, index) => {
            return item.quantity;
          }),
          backgroundColor: dataList.mounth[5].color,
          hoverBackgroundColor:
            "rgba(" +
            dataList.mounth[5].color.substring(
              4,
              dataList.mounth[5].color.length - 1
            ) +
            ", 0.6)",

          borderColor:
            "rgba(" +
            dataList.mounth[5].color.substring(
              4,
              dataList.mounth[5].color.length - 1
            ) +
            ", 0.8)",

          borderWidth: 5,
          borderRadius: 5,
        },
      ];
      scales = {
        x: {
          ticks: {
            callback: function (value) {
              return value + 1;
            },
          },
        },
      };
    }
    if (type === "quarter") {
      dataList.quarter.forEach((item, index) => {
        labels = [...labels, "Quý " + item.name];
      });
      dataSet = [
        ...dataSet,
        {
          label: "Sản phẩm",
          data: dataList.quarter.map((item, index) => {
            return item.quantity;
          }),
          backgroundColor: dataList.quarter[1].color,
          hoverBackgroundColor:
            "rgba(" +
            dataList.quarter[1].color.substring(
              4,
              dataList.quarter[1].color.length - 1
            ) +
            ", 0.6)",

          borderColor:
            "rgba(" +
            dataList.quarter[1].color.substring(
              4,
              dataList.quarter[1].color.length - 1
            ) +
            ", 0.8)",

          borderWidth: 5,
          borderRadius: 5,
        },
      ];
      scales = {
        x: {
          ticks: {
            callback: function (value) {
              return "Quý " + (value + 1);
            },
          },
        },
      };
    }
    if (type === "year") {
      const currentYear = new Date().getFullYear();
      dataList.year.forEach((item, index) => {
        labels = [...labels, currentYear - (5 - parseInt(item.name))];
      });
      dataSet = [
        ...dataSet,
        {
          label: "Sản phẩm",
          data: dataList.year.map((item, index) => {
            return item.quantity;
          }),
          backgroundColor: dataList.year[1].color,
          hoverBackgroundColor:
            "rgba(" +
            dataList.year[1].color.substring(
              4,
              dataList.year[1].color.length - 1
            ) +
            ", 0.6)",

          borderColor:
            "rgba(" +
            dataList.year[1].color.substring(
              4,
              dataList.year[1].color.length - 1
            ) +
            ", 0.8)",

          borderWidth: 5,
          borderRadius: 5,
        },
      ];
      scales = {
        // x: {
        //   ticks: {
        //     callback: function (value) {
        //       return value;
        //     },
        //   },
        // },
      };
    }
  }

  if (title === "Sản phẩm lỗi") {
    // { status: "NEW", quantity: 300, color: "rgb(66, 194, 255)" }
    console.log(dataList);
    labels = [];
    if (type === "productLine") {
      dataList.productLine.forEach((item, index) => {
        labels = [...labels, item.name];
      });
      dataSet = [
        ...dataSet,
        {
          label: "Sản phẩm lỗi",
          data: dataList.productLine.map((item, index) => {
            return item.quantity;
          }),
          backgroundColor: dataList.productLine[0].color,
          hoverBackgroundColor:
            "rgba(" +
            dataList.productLine[0].color.substring(
              4,
              dataList.productLine[0].color.length - 1
            ) +
            ", 0.6)",

          borderColor:
            "rgba(" +
            dataList.productLine[0].color.substring(
              4,
              dataList.productLine[0].color.length - 1
            ) +
            ", 0.8)",

          borderWidth: 5,
          borderRadius: 5,
        },
      ];
      scales = {
        y: {
          ticks: {
            callback: function (value) {
              if (value % 1 === 0) return value;
            },
          },
        },
      };
    }
    if (type === "factory") {
      dataList.factory.forEach((item, index) => {
        labels = [...labels, item.name];
      });
      dataSet = [
        ...dataSet,
        {
          label: "Sản phẩm lỗi",
          data: dataList.factory.map((item, index) => {
            return item.quantity;
          }),
          backgroundColor: dataList.factory[0].color,
          hoverBackgroundColor:
            "rgba(" +
            dataList.factory[0].color.substring(
              4,
              dataList.factory[0].color.length - 1
            ) +
            ", 0.6)",

          borderColor:
            "rgba(" +
            dataList.factory[0].color.substring(
              4,
              dataList.factory[0].color.length - 1
            ) +
            ", 0.8)",

          borderWidth: 5,
          borderRadius: 5,
        },
      ];
      scales = {
        y: {
          ticks: {
            callback: function (value) {
              if (value % 1 === 0) return value;
            },
          },
        },
      };
    }
    if (type === "agency") {
      dataList.agency.forEach((item, index) => {
        labels = [...labels, item.name];
      });
      dataSet = [
        ...dataSet,
        {
          label: "Sản phẩm lỗi",
          data: dataList.agency.map((item, index) => {
            return item.quantity;
          }),
          backgroundColor: dataList.agency[0].color,
          hoverBackgroundColor:
            "rgba(" +
            dataList.agency[0].color.substring(
              4,
              dataList.agency[0].color.length - 1
            ) +
            ", 0.6)",

          borderColor:
            "rgba(" +
            dataList.agency[0].color.substring(
              4,
              dataList.agency[0].color.length - 1
            ) +
            ", 0.8)",

          borderWidth: 5,
          borderRadius: 5,
        },
      ];
      scales = {
        y: {
          ticks: {
            callback: function (value) {
              if (value % 1 === 0) return value;
            },
          },
        },
      };
    }
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
