import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({
  title,
  legend,
  labelList,
  dataList,
  scales,
  tooltip,
}) {
  const options = {
    responsive: true,
    // scales: scales,
    scales: scales,

    plugins: {
      legend: {
        position: "top",
        labels: {
          fontColor: "red",
          font: {
            size: 10,
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 20,
        },
        color: "black",
      },
      tooltip: tooltip,
    },
  };

  const labels = [...labelList];

  const data = {
    labels,
    datasets: [
      // {
      //   label: "Dataset 1",
      //   data: labels.map(() => Math.random() * 10),
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => Math.random() * 10),
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
      ...dataList,
    ],
  };

  return <Bar options={options} data={data} />;
}
