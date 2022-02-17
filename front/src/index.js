import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Expenses from "./containers/Expenses";
import Invoices from "./containers/Invoices";
import HomePage from "./containers/HomePage";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="string" element={<HomePage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
