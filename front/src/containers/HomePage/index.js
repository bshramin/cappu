import { useEffect, useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";
import { CONTACT_ABI, CONTACT_ADDRESS } from "../../config";

function HomePage() {
  return (
    <div>
      <h1>This is HomePage</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">HomePage</Link> | <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link> |{" "}
        <Link to="/string">TheString</Link>
      </nav>
    </div>
  );
}

export default HomePage;
