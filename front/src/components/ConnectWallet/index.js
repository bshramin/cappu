import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { connectWallet } from "../../helpers/connect";
import { DAPP_URL, METAMASK_DEEPLINK_PREFIX } from "../../config.js";

import "./style.css";

export default function ConnectWallet() {
  return (
    <ButtonGroup
      className="connect-wallet-button-group"
      variant="contained"
      aria-label="outlined primary button group"
    >
      <Button className="connect-wallet-button" onClick={connectWallet}>
        Connect Metamask Extension
      </Button>
      <Button
        className="connect-wallet-button"
        onClick={() => window.open(METAMASK_DEEPLINK_PREFIX + DAPP_URL)}
      >
        Open in Metamask Browser
      </Button>
    </ButtonGroup>
  );
}
