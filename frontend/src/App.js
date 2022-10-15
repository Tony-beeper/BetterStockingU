// import "./App.css";
// import Header from "./components/header/header";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import SentimentChart from "./components/sentimentChart/sentimentChart";
// import SearchBar from "./components/SearchBar/SearchBar";

// function App() {
//     const filterData = (query, data) => {
//         if (!query) {
//             return data;
//         } else {
//             return data.filter((d) =>
//                 d.toLowerCase().includes(query.toLowerCase())
//             );
//         }
//     };
//     const data = [
//         "Paris",
//         "London",
//         "New York",
//         "Tokyo",
//         "Berlin",
//         "Buenos Aires",
//         "Cairo",
//         "Canberra",
//         "Rio de Janeiro",
//         "Dublin",
//     ];
//     const [searchQuery, setSearchQuery] = useState("");
//     const dataFiltered = filterData(searchQuery, data);

//     useEffect(() => {}, []);

//     return (
//         <div className="my_app">
//             <SearchBar
//                 searchQuery={searchQuery}
//                 setSearchQuery={setSearchQuery}
//             />

//             <div style={{ padding: 3 }}>
//                 {dataFiltered.map((d, index) => (
//                     <div
//                         className="search-bar-text"
//                         key={index}
//                         onClick={(e) => {
//                             setSearchQuery(d);
//                         }}
//                     >
//                         {d}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bar from "./components/Navbar";
import SignUp from "./pages/Signup/SignUp";
import Login from "./pages/Login/Login";
import React, { useState } from "react";
import AddRoom from "./pages/AddRoom/AddRoom";
import Room from "./pages/MyRooms/Room";
import NoteBook from "./pages/Notebook/Notebook";
import HomePage from "./pages/HomePage/HomePage";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import CreditsPage from "./pages/CreditsPage/CreditsPage";
export const ThemeContext = React.createContext();

const theme = createTheme({
  palette: {
    primary: { main: "#21262d" },
    secondary: { main: "#238636" },
    info: {
      main: "#faff01",
    },
  },
});

function App() {
  const [context, setContext] = useState({
    username: document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    ),
  });

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={[context, setContext]}>
        <Router>
          <ToastContainer theme="colored" />
          <Bar />
          <Routes>
            <Route path="/room/add/" element={<AddRoom />} />
            <Route path="/room/" element={<Room />} />
            <Route path="/room/:id" element={<NoteBook />} />
            <Route path="/signup/" element={<SignUp />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/credits" element={<CreditsPage />} />
            <Route exact path="/" element={<HomePage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
