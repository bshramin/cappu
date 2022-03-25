import { useEffect, useState } from "react";
import Web3 from "web3";

import { CONTACT_ABI, CONTACT_ADDRESS, NETWORK } from "../../config";
import "./style.css";

export default function HomePage() {
  const [numberOfTokenHolders, setNumberOfTokenHolders] = useState();
  const [numberOfMintedTokens, setNumberOfMintedTokens] = useState();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const web3 = new Web3(Web3.givenProvider || NETWORK);
    const cappuContract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);

    cappuContract.methods
      .getNumberOfTokenHolders()
      .call()
      .then(setNumberOfTokenHolders);

    cappuContract.methods
      .getNumberOfMintedTokens()
      .call()
      .then(setNumberOfMintedTokens);
  };

  return (
    <div className="homepage-container">
      <div className="homepage-info">
        {numberOfMintedTokens ? (
          <div className="homepage-info-item">
            <div className="homepage-info-item-title">
              Number of Minted Tokens
            </div>
            <div className="homepage-info-item-value">
              {numberOfMintedTokens}
            </div>
          </div>
        ) : null}
        {numberOfTokenHolders ? (
          <div className="homepage-info-item">
            <div className="homepage-info-item-title">
              Current Number of Token Holders
            </div>
            <div className="homepage-info-item-value">
              {numberOfTokenHolders}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
