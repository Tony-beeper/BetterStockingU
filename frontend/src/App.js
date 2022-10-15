import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from "react";

import HomePage from "./pages/HomePage/HomePage";



function App() {
  const [context, setContext] = useState({
    username: document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    ),
  });

  return (
        <Router>
          <ToastContainer theme="colored" />
          <Routes>

            <Route exact path="/" element={<HomePage />} />
          </Routes>
        </Router>
  );
}

export default App;
