import React from "react";
import { LineChart } from "../../../../components/common/Chart";
import { type } from "@testing-library/user-event/dist/type";

// sizeLabels={sizeLabelStatusChart}
//             sizeTitle={sizeTitle}

function LineChartSingle({
  title,
  dataList,
  labelList,
  sizeLabels,
  sizeTitle,
  positionLabels,
  type,
}) {
  console.log(dataList);
  let dataSet = [];
  labelList = [];
  const elements = {
    point: {
      pointRadius: 100,
    },
  };

  if (type === "mounth") {
    labelList = dataList[0].mounth.map((item, index) => {
      return item.name;
    });

    dataList.forEach((item, index) => {
      dataSet = [
        ...dataSet,
        {
          label: item.name,
          data: item.mounth.map((item, index) => {
            return item.quantity;
          }),
          borderColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 1)",
          backgroundColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 0.7)",
          tension: 0.4,
          // fill: true,
        },
      ];
    });
  }
  if (type === "quarter") {
    labelList = dataList[0].quarter.map((item, index) => {
      return item.name;
    });

    dataList.forEach((item, index) => {
      dataSet = [
        ...dataSet,
        {
          label: item.name,
          data: item.quarter.map((item, index) => {
            return item.quantity;
          }),
          borderColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 1)",
          backgroundColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 0.7)",
          tension: 0.4,
          // fill: true,
        },
      ];
    });
  }
  if (type === "year") {
    const currentYear = new Date().getFullYear();
    labelList = dataList[0].year.map((item, index) => {
      return currentYear - (5 - parseInt(item.name));
    });

    dataList.forEach((item, index) => {
      dataSet = [
        ...dataSet,
        {
          label: item.name,
          data: item.year.map((item, index) => {
            return item.quantity;
          }),
          borderColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 1)",
          backgroundColor:
            "rgba(" + item.color.substring(4, item.color.length - 1) + ", 0.7)",
          tension: 0.4,
          // fill: true,
        },
      ];
    });
  }

  return (
    <LineChart
      title={title}
      dataList={dataSet}
      labelList={labelList}
      elements={elements}
      sizeLabels={sizeLabels}
      sizeTitle={sizeTitle}
      positionLabels={positionLabels}
    />
  );
}

export default LineChartSingle;
