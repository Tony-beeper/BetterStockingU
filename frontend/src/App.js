import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bar from "./components/Navbar";

import Login from "./pages/Login/Login";
import React, { useState } from "react";

import HomePage from "./pages/HomePage/HomePage";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";

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
            <Route path="/login/" element={<Login />} />

            <Route exact path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
