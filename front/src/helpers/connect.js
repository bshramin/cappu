import Web3 from "web3";
import { CONTACT_ABI, CONTACT_ADDRESS, NETWORK } from "../config";

export const connectWallet = async () => {
  console.log("Connecting to Wallet...");
  const web3 = new Web3(Web3.givenProvider || NETWORK);
  const accounts = await web3.eth.requestAccounts();
  window.sessionStorage.setItem("account", accounts[0]);
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
};
