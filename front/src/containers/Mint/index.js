import { useEffect, useState } from "react";
import Web3 from "web3";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { retrieveWalletAddress } from "../../helpers/connect";
import { CONTACT_ABI, CONTACT_ADDRESS, NETWORK } from "../../config";
import "./style.css";

function Mint() {
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const load = async () => {
      setAccount(retrieveWalletAddress());

      const web3 = new Web3(Web3.givenProvider || NETWORK);
      const cappuContract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
      setContract(cappuContract);
    };

    load();
  }, []);

  var mintToken = async () => {
    contract.methods
      .mint(data)
      .send({ from: account })
      .then(() => {
        console.log("Minted");
      });
  };

  return account ? (
    <div className="mint-container">
      <div>Your account is: {account}</div>
      <Input multiline minRows="4" onChange={(e) => setData(e.target.value)} />
      <Button variant="contained" className="submit-btn" onClick={mintToken}>
        Mint
      </Button>
    </div>
  ) : (
    <div className="mint-container">
      <div>Connect your wallet.</div>
    </div>
  );
}

export default Mint;
