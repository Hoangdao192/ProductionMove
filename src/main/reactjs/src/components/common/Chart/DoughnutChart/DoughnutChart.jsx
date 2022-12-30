import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ dataChart, label, options, colors, title, legend }) {
  const data = {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    labels: label,
    datasets: [
      {
        label: "Số lượng",
        data: dataChart,
        backgroundColor: colors
          ? colors
          : [
              "rgb(51,255,254)",
              "rgb(50,255,152)",
              "rgb(52,255,51)",
              "rgb(153,255,50)",
              "rgb(255,255,51)",
              "rgb(255,153,52)",
              "rgb(255,51,52)",
              "rgb(255,51,154)",
              "rgb(254,51,255)",
              "rgb(153,51,255)",
              "rgb(50,51,255)",
              "rgb(51,153,254)",
            ],
        borderColor: colors
          ? colors
          : [
              "rgb(51,255,254)",
              "rgb(50,255,152)",
              "rgb(52,255,51)",
              "rgb(153,255,50)",
              "rgb(255,255,51)",
              "rgb(255,153,52)",
              "rgb(255,51,52)",
              "rgb(255,51,154)",
              "rgb(254,51,255)",
              "rgb(153,51,255)",
              "rgb(50,51,255)",
              "rgb(51,153,254)",
            ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      options={{
        plugins: {
          legend: {
            // Hiển thị chú thích màu
            display: legend,
          },
          title: {
            display: title ? true : false,
            text: title,
          },
        },
      }}
    />
  );
}

export default DoughnutChart;
