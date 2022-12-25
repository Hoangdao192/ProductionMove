import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ title, dataList, labelList }) {
  // console.log(title);
  // console.log(dataList);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const labels = [...labelList];

  const data = {
    labels,
    // datasets: [
    //   {
    //     label: "Dataset 1",
    //     data: labels.map(() => Math.random() * 10),
    //     borderColor: "rgb(255, 99, 132)",
    //     backgroundColor: "rgba(255, 99, 132, 0.5)",
    //   },
    //   {
    //     label: "Dataset 2",
    //     data: labels.map(() => Math.random() * 10),
    //     borderColor: "rgb(53, 162, 235)",
    //     backgroundColor: "rgba(53, 162, 235, 0.5)",
    //   },
    // ],
    datasets: [...dataList],
  };

  // console.log(data.datasets);

  return <Line options={options} data={data} />;
}

export default LineChart;
