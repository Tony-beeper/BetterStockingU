import "./HomePage.css";
import Container from '@mui/material/Container';
import { doughData } from "../../components/sentimentChart/sentimentChart";
import { options } from "../../components/sentimentChart/sentimentChart";

import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

// import "./App.css";
// import Header from "./components/header/header";
import { useEffect, useState } from "react";
// import axios from "axios";
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
  const dataFiltered = filterData(searchQuery, data);

  useEffect(() => {}, []);

  return (
    <Container maxWidth="xl">
        

        
      <div className="homepage">
        <div className="search-section">
        <SearchBar options={data} setSearchQuery={setSearchQuery} />
        <PostList/>
        </div>
        <div className="graph-section">
        <Doughnut
          options={options}
          data={doughData}
          className="backgroundImage"
        />
        <Bar options={barOptions} data={barData} className="backgroundImage" />
        </div>
        

      </div>
    </Container>
  );
};

export default HomePage;
