import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {
  connectWallet,
  retrieveWalletAddress,
  isWalletConnected,
  disconnectWallet,
} from "../../helpers/connect";
import "./style.css";

const Header = () => {
  const [account, setAccount] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const pages = [
    { title: "TheString", url: "/string" },
    { title: "Invoices", url: "/invoices" },
    { title: "Expenses", url: "/expenses" },
  ];

  const settings = [
    {
      title: retrieveWalletAddress(),
      login: true,
    },
    {
      title: "Connect Wallet",
      login: false,
      onClick: () => {
        connectWallet().then(() => {
          setIsLoggedIn(isWalletConnected());
        });
      },
    },
    { title: "Profile", login: true },
    {
      title: "Disconnect Wallet",
      login: true,
      onClick: () => {
        disconnectWallet();
        setIsLoggedIn(false);
      },
    },
  ];

  useEffect(() => {
    setAccount(retrieveWalletAddress());
    setIsLoggedIn(isWalletConnected());
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link to="/">Cappu</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Link to={page.url}>
                    <Typography
                      textAlign="center"
                      className="header-nav-link-mobile"
                    >
                      {page.title}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link to="/">Cappu</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page.url} className="header-nav-item" key={page.title}>
                <Typography
                  textAlign="center"
                  className="header-nav-link-desktop"
                >
                  {page.title}
                </Typography>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Cappu" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) =>
                setting.login === isLoggedIn ? (
                  <MenuItem key={setting.title} onClick={setting.onClick}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ) : null
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
