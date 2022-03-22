import Web3 from "web3";
import { NETWORK } from "../config";

export const connectWallet = async () => {
  console.info("Connecting to Wallet...");
  if (typeof window.ethereum === "undefined") {
    console.info("MetaMask is not installed!");
    alert("You need to install the Metamask extension.");
    return;
  }

  const web3 = new Web3(Web3.givenProvider || NETWORK);
  const accounts = await web3.eth.requestAccounts();
  window.sessionStorage.setItem("account", accounts[0]);
  window.location.reload();
};

export const retrieveWalletAddress = () => {
  const walletAddress = window.sessionStorage.getItem("account");
  return walletAddress;
};

export const isWalletConnected = () => {
  const walletAddress = window.sessionStorage.getItem("account");
  return walletAddress ? true : false;
};

export const disconnectWallet = () => {
  window.sessionStorage.removeItem("account");
  window.location.reload();
};