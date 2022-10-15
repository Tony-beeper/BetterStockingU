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
// import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const defaultFont = {
  family: "Georgia",
  size: 35,
  color: "black",
};
const colorCode = "black";

export const barOptions = {
  scales: {
    x: {
      grid: {},
      beginAtZero: false,
      ticks: {
        color: colorCode,
        font: defaultFont,
      },
    },
    y: {
      grid: {},
      beginAtZero: true,
      ticks: {
        color: colorCode,
        font: defaultFont,
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 69,
          fontColor: "blue",
        },
      },
    },
  },
};
// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Chart.js Bar Chart",
//     },
//   },
// };

const labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];

export const barData = {
  labels,
  datasets: [
    {
      label: "Color Data",
      labelColor: "blue",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    },
    // {
    //   label: "Color Data",
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //   backgroundColor: "rgba(1,2,3,0.7)",
    // },
  ],
};

// export function App() {
//   return <Bar options={options} data={data} />;
// }
