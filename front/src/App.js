import { useEffect, useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";
import { CONTACT_ABI, CONTACT_ADDRESS } from "./config";

function App() {
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [theString, setTheString] = useState();

  // useEffect(() => {
  //   async function load() {
  //     const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  //     const accounts = await web3.eth.requestAccounts();
  //     setAccount(accounts[0]);

  //     const cappuContract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
  //     setContract(cappuContract);

  //     const theString = await cappuContract.methods.getString().call();
  //     setTheString(theString);
  //   }

  //   load();
  // }, []);

  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
    </div>
  );
}

export default App;
