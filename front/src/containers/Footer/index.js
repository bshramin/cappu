import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./style.css";

const Footer = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography className="footer-copyright">
            Cappu, The NFT Platform.
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Footer;
