import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "../../../components/Modal";
import { extractErrorMessage } from "../../../helpers/errors";
import { retrieveWalletAddress, getContract } from "../../../helpers/connect";
import "./style.css";
import { Typography } from "@mui/material";

export default function TokenTransferModal({ show, tokenId, onClose }) {
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferError, setTransferError] = useState(null);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [destination, setDestination] = useState();

  useEffect(() => {
    const load = async () => {
      let account = retrieveWalletAddress();
      const cappuContract = await getContract();
      setContract(cappuContract);
      setAccount(account);
    };

    load();
  }, []);

  const sendToken = async () => {
    try {
      setTransferLoading(true);
      await contract.methods
        .safeTransferFrom(account, destination, tokenId)
        .send({ from: account })
        .then(() => {
          console.info("Sent successfully");
          setTransferSuccess(true);
        })
        .catch((err) => {
          console.error(err);
          setTransferError(extractErrorMessage(err));
        })
        .finally(() => {
          setTransferLoading(false);
        });
    } catch (e) {
      console.error(e);
      setTransferError(extractErrorMessage(e));
      setTransferLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onClose={() => {
        onClose(transferSuccess);
      }}
    >
      {(() => {
        if (transferLoading) {
          return <CircularProgress />;
        }
        if (transferError) {
          return (
            <Typography sx={{ textAlign: "center", color: "red" }}>
              {transferError}
            </Typography>
          );
        }
        if (transferSuccess) {
          return (
            <Typography sx={{ textAlign: "center", color: "green" }}>
              Transfer successful
            </Typography>
          );
        }
        return (
          <div className="transfer-token-container">
            <Input
              className="transfer-token-input"
              placeholder="Destination address..."
              onChange={(e) => {
                setDestination(e.target.value);
              }}
            />
            <Button
              variant="contained"
              className="transfer-token-btn"
              onClick={sendToken}
            >
              Send Token
            </Button>
          </div>
        );
      })()}
    </Modal>
  );
}
