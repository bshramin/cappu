import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  getContract,
  getContractAddress,
  getDesiredNetworkName,
  connectWallet,
} from "../../helpers/connect";
import { DAPP_URL, METAMASK_DEEPLINK_PREFIX } from "../../config.js";

import "./style.css";

export default function HomePage() {
  const [numberOfTokenHolders, setNumberOfTokenHolders] = useState();
  const [numberOfMintedTokens, setNumberOfMintedTokens] = useState();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const cappuContract = await getContract();
    cappuContract.methods
      .getNumberOfTokenHolders()
      .call()
      .then(setNumberOfTokenHolders)
      .catch(console.error);

    cappuContract.methods
      .getNumberOfMintedTokens()
      .call()
      .then(setNumberOfMintedTokens)
      .catch(console.error);
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
      </div>
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
              Number of Token Holders
            </div>
            <div className="homepage-info-item-value">
              {numberOfTokenHolders}
            </div>
          </div>
        ) : null}
      </div>

      <div className="homepage-actions">
        <ButtonGroup
          className="homepage-actions-button-group"
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button className="homepage-actions-button" onClick={connectWallet}>
            Connect Metamask Extension
          </Button>
          <Button
            className="homepage-actions-button"
            onClick={() => window.open(METAMASK_DEEPLINK_PREFIX + DAPP_URL)}
          >
            Open in Metamask Browser
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
