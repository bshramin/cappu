import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyTokens from "./containers/MyTokens";
import Mint from "./containers/Mint";
import HomePage from "./containers/HomePage";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Faucets from "./containers/Faucets";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      dark: "#7b5e57",
      main: "#4e342e",
      light: "#260e04",
    },
    secondary: {
      dark: "#6a4f4b",
      main: "#3e2723",
      light: "#1b0000",
    },
    background: {
      default: "#eeeeee",
      light: "#f5f5f5",
      dark: "#424242",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <div className="main-section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="my-tokens" element={<MyTokens />} />
          <Route path="mint" element={<Mint />} />
          <Route path="faucets" element={<Faucets />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
