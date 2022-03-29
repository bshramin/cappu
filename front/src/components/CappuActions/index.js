import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import "./style.css";

export default function CappuActions() {
  let navigate = useNavigate();

  return (
    <ButtonGroup
      className="connect-wallet-button-group"
      variant="contained"
      aria-label="outlined primary button group"
    >
      <Button
        className="connect-wallet-button"
        onClick={() => {
          navigate("/mint");
        }}
      >
        Mint a Token
      </Button>
      <Button
        className="connect-wallet-button"
        onClick={() => {
          navigate("/my-tokens");
        }}
      >
        My Tokens
      </Button>
    </ButtonGroup>
  );
}
