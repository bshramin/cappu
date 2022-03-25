import Web3 from "web3";
import { NETWORK, NETWORK_NAME, CONTACT_ABI, CONTACT_ADDRESS } from "../config";

export const getContractAddress = () => {
  return CONTACT_ADDRESS;
};

export const getDesiredNetworkName = () => {
  return NETWORK_NAME;
};

export const getDesiredNetwork = () => {
  return NETWORK;
};

export const getWalletNetwork = () => {
  return Web3.givenProvider;
};

export const getWalletWeb3 = () => {
  return new Web3(Web3.givenProvider);
};

export const getWalletNetworkName = async () => {
  const web3 = getWalletWeb3();
  let networkName = await web3.eth.net.getNetworkType();
  return networkName;
};

export const isOnTheRightNetwork = async () => {
  let networkName = await getWalletNetworkName();
  return networkName === getDesiredNetworkName();
};

export const getWeb3 = async () => {
  const isRightNetwork = await isOnTheRightNetwork();
  if (isRightNetwork) {
    return new Web3(Web3.givenProvider);
  }
  return new Web3(NETWORK);
};

export const getContract = async () => {
  const web3 = await getWeb3();
  const cappuContract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
  return cappuContract;
};

export const connectWallet = async () => {
  console.info("Connecting to Wallet...");
  if (typeof window.ethereum === "undefined") {
    alert("You need to install the Metamask extension.");
    return;
  }

  const isRightNetwork = await isOnTheRightNetwork();
  if (!isRightNetwork) {
    console.info("Wrong network!");
    alert(
      "You need to connect your wallet to the " + NETWORK_NAME + " network."
    );
    return;
  }

  const web3 = await getWeb3();
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
