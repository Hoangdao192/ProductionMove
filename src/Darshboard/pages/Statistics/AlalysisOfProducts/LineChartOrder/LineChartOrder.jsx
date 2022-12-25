import React from "react";
import { LineChart } from "../../../../components/common/Chart";

function LineChartOrder({ title, dataList, labelList, nameList }) {
  const colors = [
    {
      border: "rgb(250,58,47)",
      background: "rgba(250,58,47,0.5)",
    },
    {
      border: "rgb(1,135,198)",
      background: "rgba(1,135,198,0.5)",
    },
    {
      border: "rgb(0,208,102)",
      background: "rgba(0,208,102,0.5)",
    },
  ];
  // console.log(dataList);

  let dataSet = [];
  dataList.forEach((item, index) => {
    dataSet = [
      ...dataSet,
      {
        label: nameList[index],
        data: item,
        borderColor: colors[index].border,
        backgroundColor: colors[index].background,
      },
    ];
  });
  return <LineChart title={title} dataList={dataSet} labelList={labelList} />;
}

export default LineChartOrder;
