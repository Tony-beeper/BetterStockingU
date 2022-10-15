import "./App.css";
import Header from "./components/header/header";
import { useEffect, useState } from "react";
import axios from "axios";
import SentimentChart from "./components/sentimentChart/sentimentChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const doughData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export function App() {
  const [chart, setChart] = useState(<div></div>);
  const [header, setHeader] = useState(<div></div>);
  const pos = [
    "DraftKings Inc. stock rises Wednesday, outperforms market",
    "More Room For Growth In Pioneer Energy Stock?",
    "After Dismal Performance Last Month, L'Oreal Stock Looks Set To Rebound",
    "The stock market is close to finding its bottom as corporate share buybacks surge to record highs, JPMorgan says",
    "GameStop Unveils Crypto and NFT Wallet, Shares up 3%",
  ];
  const neg = [
    "Bear Market Has Only Just Begun",
    "How Do You Stay Confident in a Market Crash?",
    "Here's 1 of the Biggest Problems With Airbnb Stock",
    "Should You Buy Stocks With An Impending Bear Market And Possible Recession?",
    "Costco Q3 Earnings Preview: Don't Fall With It Any Longer (NASDAQ:COST)",
  ];

  let pos_p = pos.map((p) => {
    return <p>{p}</p>;
  });

  let neg_p = neg.map((n) => {
    return <p>{n}</p>;
  });

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_REST_API + "/api/reddit",
    }).then((res) => {
      axios({
        method: "get",
        url: process.env.REACT_APP_REST_API + "/api/news",
      }).then((news) => {
        console.log();
        if (news.data.data[0].chart_data[0] < 0) {
          setHeader(<Header sentiment="negative" />);
        } else {
          setHeader(<Header sentiment="positive" />);
        }
        setChart(<SentimentChart reddit={[1, 2, 3]} news={[1, 2, 3]} />);
      });
    });
  }, []);

  return (
    <div className="my_app">
      {header}
      {/* {chart} */}
      <Doughnut data={doughData} />
      <div className="pos_neg">
        <div className="pos_list">
          <p className="pos_title">Positive Articles</p>
          {pos_p}
        </div>
        <div className="neg_list">
          <p className="neg_title">Negative Articles</p>
          {neg_p}
        </div>
      </div>
    </div>
  );
}

// import React from "react";

// export function App() {
//   return <Doughnut data={data} />;
// }
