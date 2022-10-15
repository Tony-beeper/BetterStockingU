import { Home } from "@material-ui/icons";
import "./HomePage.css";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import CodeBookIconWhite from "../../media/codebookiconwhite.png";
import PageHeading from "../../components/Headings/PageHeading";
import CodebookLink from "../../components/CodebookLink/CodebookLink";
import { doughData } from "../../components/sentimentChart/sentimentChart";
import { Doughnut } from "react-chartjs-2";
// import "./App.css";
// import Header from "./components/header/header";
import { useEffect, useState } from "react";
// import axios from "axios";
// import SentimentChart from "./components/sentimentChart/sentimentChart";
import SearchBar from "../../components/SearchBar/SearchBar";

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
      <PageHeading>BetterStockingU</PageHeading>
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
        <Doughnut data={doughData} className="backgroundImage" />
        <Doughnut data={doughData} className="backgroundImage" />
        {/* 
        <div className="credits">
          <CodebookLink href="/credits">Credits</CodebookLink>
        </div> */}
      </div>
    </Container>
  );
};

export default HomePage;
