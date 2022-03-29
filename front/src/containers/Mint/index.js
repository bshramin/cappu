import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import {
  retrieveWalletAddress,
  getContract,
  getWalletNetworkName,
  getDesiredNetworkName,
} from "../../helpers/connect";
import ResultModal from "../../components/ResultModal";
import ConnectWallet from "../../components/ConnectWallet";
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
      const cappuContract = await getContract();
      setContract(cappuContract);
      const netName = await getWalletNetworkName();
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
          return (
            <>
              <span>
                Connect your Metamask wallet or open Cappu in the Metamask
                browser
              </span>
              <ConnectWallet />
            </>
          );
        }
        if (networkName !== getDesiredNetworkName()) {
          return (
            <span>
              {" "}
              {"You need to connect your wallet to the " +
                getDesiredNetworkName() +
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
