import { useEffect, useState } from "react";
import Web3 from "web3";
import { retrieveWalletAddress } from "../../helpers/connect";
import { CONTACT_ABI, CONTACT_ADDRESS, NETWORK } from "../../config";
import "./style.css";

export default function MyTokens() {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    const load = async () => {
      let account = retrieveWalletAddress();
      if (account) {
        const web3 = new Web3(Web3.givenProvider || NETWORK);
        const cappuContract = new web3.eth.Contract(
          CONTACT_ABI,
          CONTACT_ADDRESS
        );
        const balance = await cappuContract.methods.balanceOf(account).call();

        setBalance(balance);
        setAccount(account);
      }
    };

    load();
  }, []);

  console.log(account, balance);
  return account ? (
    <div className="my-tokens-container">
      <span>My Tokens</span>
      <span>{account}</span>
      <span>{balance}</span>
    </div>
  ) : (
    <div className="my-tokens-container">
      <span>Conect your wallet.</span>
    </div>
  );
}
