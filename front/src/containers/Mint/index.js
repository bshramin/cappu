import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import {
  retrieveWalletAddress,
  getContract,
  getWalletNetworkName,
  getDesiredNetworkName,
} from "../../helpers/connect";
import Modal from "../../components/Modal";
import ConnectWallet from "../../components/ConnectWallet";
import { extractErrorMessage } from "../../helpers/errors";
import "./style.css";

function Mint() {
  const [mintLoading, setMintLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
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
      setPageLoading(false);
    };

    load();
  }, []);

  var mintToken = async () => {
    setMintLoading(true);
    contract.methods
      .mint(data)
      .send({ from: account })
      .then(() => {
        console.info("Minted");
        setMintSuccess(true);
      })
      .catch((e) => {
        setMintSuccess(false);
        console.error(e);
        setErrMsg(extractErrorMessage(e));
      })
      .finally(() => {
        setMintLoading(false);
      });
  };

  return (
    <div className="mint-container">
      {(() => {
        if (pageLoading) {
          return <CircularProgress />;
        }
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
              disabled={mintLoading}
            />
            <Button
              variant="contained"
              className="mint-submit"
              onClick={mintToken}
              disabled={mintLoading}
            >
              Mint
            </Button>
          </>
        );
      })()}
      <Modal
        show={mintSuccess != null || mintLoading}
        onClose={() => {
          setMintSuccess(null);
          setErrMsg(null);
        }}
      >
        {mintLoading ? (
          <div className="modal-pending-child">
            <Typography variant="h6">
              Minting, This Can Take a While...
            </Typography>
            <CircularProgress sx={{ marginTop: "10px" }} />
          </div>
        ) : (
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            color={mintSuccess ? "green" : "red"}
            sx={{ textAlign: "center" }}
          >
            {mintSuccess ? "Minted" : errMsg}
          </Typography>
        )}
      </Modal>
    </div>
  );
}

export default Mint;
