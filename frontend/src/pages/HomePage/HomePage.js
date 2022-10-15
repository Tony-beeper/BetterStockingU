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
      <div className="my_app">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div style={{ padding: 3 }}>
          {dataFiltered.map((d, index) => (
            <div
              className="search-bar-text"
              key={index}
              onClick={(e) => {
                setSearchQuery(d);
              }}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
      <div className="homepage">
        {/* <img src={CodeBookIconWhite} className="backgroundImage" alt="icon" /> */}
        <Doughnut
          options={options}
          data={doughData}
          className="backgroundImage"
        />
        <Bar options={barOptions} data={barData} className="backgroundImage" />
        {/* 
        <div className="credits">
          <CodebookLink href="/credits">Credits</CodebookLink>
        </div> */}
      </div>
    </Container>
  );
};

export default HomePage;
