import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from "react";

import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";



function App() {
  

  return (
        <Router>
          <Navbar/>
          <ToastContainer theme="colored" />
          <Routes>

            <Route exact path="/" element={<HomePage />} />
          </Routes>
        </Router>
  );
}

export default App;
