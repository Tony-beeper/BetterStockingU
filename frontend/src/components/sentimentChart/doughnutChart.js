import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const defaultFont = {
  family: "Georgia",
  size: 16,
  color: "black",
};
const colorCode = "black";

export const options = {
  plugins: {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 36,
        },
      },
    },
  },
};

export const doughData = {
  labels: ["Red"/*, "Blue", "Yellow", "Green", "Purple", "Orange"*/],
  datasets: [
    {
      label: "# of Votes",
      data: [1],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        /*"rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",*/
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        /*"rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",*/
      ],
      borderWidth: 1,
    },
  ],
};

// export function doughnut() {
//   return <Doughnut data={doughData} />;
// }
