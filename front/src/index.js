import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyTokens from "./containers/MyTokens";
import Mint from "./containers/Mint";
import HomePage from "./containers/HomePage";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <div className="main-section">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="my-tokens" element={<MyTokens />} />
        <Route path="mint" element={<Mint />} />
      </Routes>
    </div>
    <Footer />
  </BrowserRouter>,
  document.getElementById("root")
);
