import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

import ConnectWallet from "../../components/ConnectWallet";
import CappuActions from "../../components/CappuActions";
import {
  getContract,
  getContractAddress,
  getDesiredNetworkName,
  isWalletConnected,
} from "../../helpers/connect";
import { timeoutPromise } from "../../helpers/timeout";
import "./style.css";

export default function HomePage() {
  let navigate = useNavigate();
  const [numOfTokensIsLoading, setNumOfTokensIsLoading] = useState(true);
  const [numOfHoldersIsLoading, setNumOfHoldersIsLoading] = useState(true);
  const [numberOfTokenHolders, setNumberOfTokenHolders] = useState();
  const [numberOfMintedTokens, setNumberOfMintedTokens] = useState();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const cappuContract = await getContract();
    timeoutPromise(cappuContract.methods.getNumberOfTokenHolders().call(), 1000)
      .then(setNumberOfTokenHolders)
      .catch(console.error);

    setNumOfHoldersIsLoading(false);

    timeoutPromise(cappuContract.methods.getNumberOfMintedTokens().call(), 1000)
      .then(setNumberOfMintedTokens)
      .catch(console.error);

    setNumOfTokensIsLoading(false);
  };

  return (
    <div className="homepage-container">
      <div className="homepage-description">
        Cappu is an NFT platform helping users mint and transfer data NFT
        tokens.
        <br />
        It is an open-source, work in progress, experimental ERC721
        smart-contract.
        <br />
        <br />
        This front-end currently contacts the contract deployed on the{" "}
        {getDesiredNetworkName()} network, at this address:
        <br />
        {getContractAddress()}
        <br />
        <br />
        You need to have the Metamask extention installed and choose the{" "}
        {getDesiredNetworkName()} network, then you can connect your wallet and
        start using the platform.
        {isWalletConnected() ? (
          <>
            <br />
            <br />
            You can get some testnet network tokens from the
            <span
              className="homepage-description-link"
              onClick={() => {
                navigate("/faucets");
              }}
            >
              {" "}
              faucets page.
            </span>
          </>
        ) : null}
      </div>
      <div className="homepage-info">
        <div className="homepage-info-item">
          <div className="homepage-info-item-title">Number of Tokens</div>
          <div className="homepage-info-item-value">
            {numOfTokensIsLoading ? <CircularProgress /> : numberOfMintedTokens}
          </div>
        </div>

        <div className="homepage-info-item">
          <div className="homepage-info-item-title">Number of Holders</div>
          <div className="homepage-info-item-value">
            {numOfHoldersIsLoading ? (
              <CircularProgress />
            ) : (
              numberOfTokenHolders
            )}
          </div>
        </div>
      </div>

      {isWalletConnected() ? <CappuActions /> : <ConnectWallet />}
    </div>
  );
}
