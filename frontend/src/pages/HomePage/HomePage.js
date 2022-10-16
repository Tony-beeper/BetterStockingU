import "./HomePage.css";
import Container from "@mui/material/Container";
import { doughData } from "../../components/sentimentChart/doughnutChart";
import { options } from "../../components/sentimentChart/doughnutChart";

import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

// import "./App.css";
// import Header from "./components/header/header";
import { useEffect, useState } from "react";
import axios from "axios";
// import SentimentChart from "./components/sentimentChart/sentimentChart";
import SearchBar from "../../components/SearchBar/SearchBar";
import { barData, barOptions } from "../../components/sentimentChart/barChart";
import PostList from "../../components/PostList/PostList";
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
  const [pieChartData, setPieChartData] = useState([]);
  const [posts,setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/twitter/search/apple").then(res =>{
      const data= res.data
      console.log(data)
      setPieChartData([...pieChartData,data.cohere.average.data.rating])
      setPosts(data.cohere.data.slice(0,3))
    })

  }, []);
  const pieData = {...doughData}
  doughData.datasets[0].data = pieChartData

  return (
    <Container maxWidth="xl">
      <div className="homepage">
        <div className="search-section">
          <SearchBar options={data} setSearchQuery={setSearchQuery} />
          {/* <SearchBar options={data} setSearchQuery={setSearchQuery} /> */}
          <PostList posts={posts} />
        </div>
        <div className="graph-section">
          {/* <div className="graph-item"> */}
          <Doughnut
            options={options}
            data={pieData}
            className="doughnutChart"
          />
          {/* </div> */}
          {/* <div className="graph-item"> */}
          <Bar options={barOptions} data={barData} className="barChart" />
          {/* </div> */}
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
