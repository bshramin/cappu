import { useEffect, useState } from "react";
import Web3 from "web3";
import { retrieveWalletAddress } from "../../helpers/connect";
import { CONTACT_ABI, CONTACT_ADDRESS, NETWORK } from "../../config";
import "./style.css";

export default function MyTokens() {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [tokensId, setTokensId] = useState();
  const [tokensData, setTokensData] = useState();

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
        const output = await cappuContract.methods
          .getUserTokens(account)
          .call();

        const id = output[0];
        const data = output[1];

        setBalance(balance);
        setAccount(account);
        setTokensId(id);
        setTokensData(data);
      }
    };

    load();
  }, []);

  return account ? (
    <div className="my-tokens-container">
      <span>My Tokens</span>
      <span>{account}</span>
      <span>{balance}</span>
      {tokensId && tokensData
        ? tokensId.map((id, index) => (
            <div key={index}>
              <div className="token-id">{id}</div>
              <div className="token-data">{tokensData[index]}</div>
            </div>
          ))
        : null}
    </div>
  ) : (
    <div className="my-tokens-container">
      <span>Conect your wallet.</span>
    </div>
  );
}
