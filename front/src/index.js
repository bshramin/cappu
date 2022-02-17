import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import TheString from "./containers/TheString";
import Expenses from "./containers/Expenses";
import Invoices from "./containers/Invoices";
import HomePage from "./containers/HomePage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="string" element={<TheString />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
