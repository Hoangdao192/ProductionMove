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
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function LineChart({
  title,
  dataList,
  labelList,
  elements,
  positionLabels,
  sizeLabels,
  sizeTitle,
}) {
  // console.log(title);
  // console.log(dataList);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: positionLabels ? positionLabels : "bottom",
        labels: {
          font: {
            size: sizeLabels ? sizeLabels : 14,
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: sizeTitle ? sizeTitle : 18,
        },
        color: "black",
      },
      // tooltip: {
      //   callbacks: {
      //     label: function (context) {
      //       let label = context.dataset.label || "";
      //       console.log(context);
      //       if (label) {
      //         label = " " + label + ": ";
      //       }
      //       if (context.parsed.y !== null) {
      //         label += context.parsed.y;
      //       }
      //       return label;
      //     },
      //   },
      // },
    },

    elements: {
      point: {
        hoverRadius: 7,
        backgroundColor: "red",
      },
      line: {
        backgroundColor: "red",
        fill: false,
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
    //     fill: true,
    //     backgroundColor: "rgba(255, 99, 132, 0.5)",
    //     tension: 0.4,
    //   },
    //   {
    //     label: "Dataset 2",
    //     data: labels.map(() => Math.random() * 10),
    //     borderColor: "rgb(53, 162, 235)",
    //     fill: true,
    //     backgroundColor: "rgba(53, 162, 235, 0.5)",
    //     tension: 0.4,
    //   },
    // ],
    datasets: [...dataList],
  };
  return <Line options={options} data={data} />;
}

export default LineChart;
