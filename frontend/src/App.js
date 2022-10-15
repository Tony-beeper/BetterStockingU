import "./App.css";
import Header from "./components/header/header";
import { useEffect, useState } from "react";
import axios from "axios";
import SentimentChart from "./components/sentimentChart/sentimentChart";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
    const filterData = (query, data) => {
        if (!query) {
            return data;
        } else {
            return data.filter((d) =>
                d.toLowerCase().includes(query.toLowerCase())
            );
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
        <div className="my_app">
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
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
    );
}

export default App;
