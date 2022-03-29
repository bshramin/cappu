import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/system/Box";
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
  const [progress, setProgress] = useState(0);
  const [account, setAccount] = useState();
  const [networkName, setNetworkName] = useState();
  const [contract, setContract] = useState();
  const [data, setData] = useState();
  const [errMsg, setErrMsg] = useState();
  const [mintSuccess, setMintSuccess] = useState();

  useEffect(() => {
    const load = async () => {
      setAccount(retrieveWalletAddress());
      setProgress(33);
      const cappuContract = await getContract();
      setContract(cappuContract);
      setProgress(66);
      const netName = await getWalletNetworkName();
      setNetworkName(netName);
      setProgress(100);
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
        if (progress !== 100) {
          return <CircularProgress variant="determinate" value={progress} />;
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
            <Box sx={{ m: 1, position: "relative" }}>
              <Button
                variant="contained"
                className="mint-submit"
                onClick={mintToken}
                disabled={mintLoading}
              >
                Mint
              </Button>
              {mintLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "secondary",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
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
            <Typography variant="h6">Minting...</Typography>
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
