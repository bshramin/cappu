import { useEffect, useState } from "react";
import Web3 from "web3";
import { CONTACT_ABI, CONTACT_ADDRESS } from "../../config";
import "./style.css";

function MintToken() {
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [theString, setTheString] = useState();

  useEffect(() => {}, []);

  return (
    <div>
      Your account is: {account}
      <h1>The String</h1>
      <ul>{theString}</ul>
    </div>
  );
}

export default MintToken;
