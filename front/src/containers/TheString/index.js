import { useEffect, useState } from "react";
import Web3 from "web3";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { retrieveWalletAddress } from "../../helpers/connect";
import { CONTACT_ABI, CONTACT_ADDRESS, NETWORK } from "../../config";
import "./style.css";

function TheString() {
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [theString, setTheString] = useState();
  const [newString, setNewString] = useState();

  useEffect(() => {
    const load = async () => {
      setAccount(retrieveWalletAddress());

      const web3 = new Web3(Web3.givenProvider || NETWORK);
      const cappuContract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
      setContract(cappuContract);

      const theString = await cappuContract.methods.getString().call();
      setTheString(theString);
    };

    load();
  }, []);

  var loadString = async () => {
    const theString = await contract.methods.getString().call();
    setTheString(theString);
  };

  var submitNewString = async () => {
    contract.methods
      .setString(newString)
      .send({ from: account })
      .then(() => {
        loadString();
      });
  };

  return account ? (
    <div className="the-string-container">
      <span>The String</span>
      <span>{theString}</span>
      <Input
        multiline
        onChange={(e) => {
          setNewString(e.target.value);
        }}
      />
      <Button
        variant="contained"
        className="submit-btn"
        onClick={submitNewString}
      >
        Submit
      </Button>
    </div>
  ) : (
    <div className="my-tokens-container">
      <span>Conect your wallet.</span>
    </div>
  );
}

export default TheString;
