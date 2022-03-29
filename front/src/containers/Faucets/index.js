import Button from "@mui/material/Button";
import "./style.css";

export default function Faucets() {
  return (
    <div className="faucets-container">
      <h2>Ropsten Network Faucets:</h2>

      <Button
        variant="contained"
        className="faucets-btn"
        onClick={() => window.open("https://faucet.egorfine.com/")}
      >
        Egor Egorov Faucet
      </Button>
      <Button
        variant="contained"
        className="faucets-btn"
        onClick={() => window.open("https://faucet.dimensions.network/")}
      >
        Dimensions Network Faucet
      </Button>
    </div>
  );
}
