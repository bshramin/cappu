import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import GitHub from "@mui/icons-material/GitHub";
import TravelExplore from "@mui/icons-material/TravelExplore";

import Web3 from "web3";

import {
  CONTACT_ABI,
  CONTACT_ADDRESS,
  NETWORK,
  NETWORK_NAME,
} from "../../config";
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
      <div className="homepage-description">
        Cappu is an NFT platform helping users mint and transfer data NFT
        tokens.
        <br />
        It is an open-source, work in progress, experimental ERC721
        smart-contract.
        <br />
        <br />
        This front-end currently contacts the contract deployed on the{" "}
        {NETWORK_NAME} network, at this address:
        <br />
        {CONTACT_ADDRESS}
        <br />
        <br />
        You need to have the Metamask extention installed and choose the{" "}
        {NETWORK_NAME} network, then you can connect your wallet and start using
        the platform.
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
              Current Number of Token Holders
            </div>
            <div className="homepage-info-item-value">
              {numberOfTokenHolders}
            </div>
          </div>
        ) : null}
      </div>
      <div className="homepage-actions">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            startIcon={<GitHub fontSize="large" color="background" />}
            onClick={() =>
              window.open("https://github.com/bshramin/cappu", "_blank")
            }
          >
            View on GitHub
          </Button>
          <Button
            onClick={() =>
              window.open(
                "https://" +
                  NETWORK_NAME +
                  ".etherscan.io/address/" +
                  CONTACT_ADDRESS,
                "_blank"
              )
            }
            startIcon={<TravelExplore fontSize="large" color="background" />}
          >
            Explore on EtherScan
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
