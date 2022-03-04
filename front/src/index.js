import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TheString from "./containers/TheString";
import Expenses from "./containers/Expenses";
import Mint from "./containers/Mint";
import HomePage from "./containers/HomePage";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Profile from "./containers/Profile";
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
        <Route path="expenses" element={<Expenses />} />
        <Route path="mint" element={<Mint />} />
        <Route path="string" element={<TheString />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
    <Footer />
  </BrowserRouter>,
  document.getElementById("root")
);
