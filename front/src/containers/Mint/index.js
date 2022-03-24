import { useEffect, useState } from "react";
import Web3 from "web3";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { retrieveWalletAddress } from "../../helpers/connect";
import {
  CONTACT_ABI,
  CONTACT_ADDRESS,
  NETWORK,
  NETWORK_NAME,
} from "../../config";
import ResultModal from "../../components/ResultModal";
import { extractErrorMessage } from "../../helpers/errors";
import "./style.css";

function Mint() {
  const [account, setAccount] = useState();
  const [networkName, setNetworkName] = useState();
  const [contract, setContract] = useState();
  const [data, setData] = useState();
  const [errMsg, setErrMsg] = useState();
  const [mintSuccess, setMintSuccess] = useState();

  useEffect(() => {
    const load = async () => {
      setAccount(retrieveWalletAddress());
      const web3 = new Web3(Web3.givenProvider || NETWORK);
      const cappuContract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
      setContract(cappuContract);
      const netName = await web3.eth.net.getNetworkType();
      setNetworkName(netName);
    };

    load();
  }, []);

  var mintToken = async () => {
    contract.methods
      .mint(data)
      .send({ from: account })
      .then(() => {
        console.info("Minted");
        setMintSuccess(true);
      })
      .catch((e) => {
        setMintSuccess(false);
        setErrMsg(extractErrorMessage(e));
      });
  };

  return (
    <div className="mint-container">
      {(() => {
        if (!account) {
          return <span>Connect your wallet</span>;
        }
        if (networkName !== NETWORK_NAME) {
          return (
            <span>
              {" "}
              {"You need to connect your wallet to the " +
                NETWORK_NAME +
                " network."}
            </span>
          );
        }
        return (
          <>
            <Input
              placeholder="Insert token data here..."
              multiline
              minRows="4"
              className="mint-input"
              onChange={(e) => setData(e.target.value)}
            />
            <Button
              variant="contained"
              className="mint-submit"
              onClick={mintToken}
            >
              Mint
            </Button>
          </>
        );
      })()}
      <ResultModal
        show={mintSuccess != null}
        onClose={() => {
          setMintSuccess(null);
          setErrMsg(null);
        }}
        color={mintSuccess ? "green" : "red"}
        text={mintSuccess ? "Minted" : errMsg}
      />
    </div>
  );
}

export default Mint;
