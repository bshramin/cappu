import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./style.css";

import GitHub from "@mui/icons-material/GitHub";
import TravelExplore from "@mui/icons-material/TravelExplore";
import {
  getContractAddress,
  getDesiredNetworkName,
} from "../../helpers/connect";

import "./style.css";

const Footer = () => {
  return (
    <AppBar position="static" className="footer-container">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography className="footer-copyright">
            Cappu, The NFT Platform.
          </Typography>
          <div>
            <GitHub
              onClick={() =>
                window.open("https://github.com/bshramin/cappu", "_blank")
              }
              fontSize="large"
              color="background"
            />

            <TravelExplore
              alt="View on Etherscan"
              onClick={() =>
                window.open(
                  "https://" +
                    getDesiredNetworkName() +
                    ".etherscan.io/address/" +
                    getContractAddress(),
                  "_blank"
                )
              }
              fontSize="large"
              color="background"
            />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Footer;
