import "./HomePage.css";
import Container from "@mui/material/Container";
import { doughData } from "../../components/sentimentChart/doughnutChart";
import { doughData2 } from "../../components/sentimentChart/doughnutChart";

import { options } from "../../components/sentimentChart/doughnutChart";

import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
// import "./App.css";
// import Header from "./components/header/header";
import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
// import SentimentChart from "./components/sentimentChart/sentimentChart";
import SearchBar from "../../components/SearchBar/SearchBar";
import { barData, barOptions } from "../../components/sentimentChart/barChart";
import PostList from "../../components/PostList/PostList";
import MyDoughChart from "../../components/MyDoughChart/MyDoughChart";
import realDough from "../../components/MyDoughChart/MyRealDoughChart"

const HomePage = () => {
  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query.toLowerCase()));
    }
  };
  const data = [
    "Paris",
    "London",
    "New York",
    "Tokyo",
    "Berlin",
    "Buenos Aires",
    "Cairo",
    "Canberra",
    "Rio de Janeiro",
    "Dublin",
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [pieChartData, setPieChartData] = useState(doughData);
  const [posts, setPosts] = useState([]);
  const [topicIndex, setTopicIndex] = useState(0);
  const [realDoughData, setRealDoughData] = useState(doughData2);
  // const memoizedChart = useMemo(MyDoughChart, [pieChartData]);
  const colors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  useEffect(() => {}, []);

  const searchTopic = (topic) => {
    axios
      .get("http://127.0.0.1:5000/api/twitter/search/" + topic)
      .then((res) => {
        const data = res.data;
        console.log(data);
        const pieData = { ...doughData };
        pieData.datasets[0].data = [
          ...pieData.datasets[0].data,
          data.cohere.average.data.rating,
        ];
        pieData.datasets[0].backgroundColor.push(colors[topicIndex]);
        pieData.datasets[0].borderColor.push(colors[topicIndex]);
        pieData.labels.push(
          topic +
            " (" +
            data.cohere.average.data.rating.toString().substring(0, 4) +
            ")"
        );
        // pieData.labels.push(topic);
        // const secondPie = JSON.parse(JSON.stringify({...doughData}));
        const secondPie = {...doughData2};

        // secondPie.datasets[0].data = 
        const abc = JSON.parse(data.frequency);
        secondPie.datasets[0].backgroundColor.push(colors[topicIndex]);
        secondPie.datasets[0].borderColor.push(colors[topicIndex]);

        Object.keys(abc).forEach(function (key) {
          secondPie.labels.push(key);
          secondPie.datasets[0].data.push(abc[key]);
        });

        // for(const i=0; i < 3;i++){
        //   secondPie.labels.push(abc[]);

        // }
        console.log("abc",abc);
        setPieChartData(pieData);
        setPosts(data.cohere.data.slice(0, 3));
        let newTopicIndex = topicIndex;
        setRealDoughData(secondPie)
        if (topicIndex < 3) {
          newTopicIndex = topicIndex + 1;
        }
        setTopicIndex(newTopicIndex);
      });
  };

  return (
    <Container maxWidth="xl">
      <div className="homepage">
        <div className="search-section">
          <SearchBar
            options={data}
            setSearchQuery={setSearchQuery}
            search={searchTopic}
          />
          {/* <SearchBar options={data} setSearchQuery={setSearchQuery} /> */}
          <PostList posts={posts} />
        </div>
        <div className="graph-section">
          {/* <div className="graph-item"> */}
          {/* {memoizedChart} */}
          <p>1-2 is positive, 0-1 is negative</p>
          {/* <MyDoughChart data={pieChartData} /> */}
          <MyDoughChart data={pieChartData} />

          <MyDoughChart data={realDoughData} />
          {/* </div> */}
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
