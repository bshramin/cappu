import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "../../../components/Modal";
import { extractErrorMessage } from "../../../helpers/errors";
import { retrieveWalletAddress, getContract } from "../../../helpers/connect";
import "./style.css";

export default function TokenTransferModal({
  show,
  tokenId,
  onSuccess,
  onError,
  onClose,
}) {
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
      await contract.methods
        .safeTransferFrom(account, destination, tokenId)
        .send({ from: account })
        .then(() => {
          console.info("Sent successfully");
          onSuccess();
        })
        .catch((err) => {
          console.error(err);
          onError(extractErrorMessage(err));
        });
    } catch (e) {
      onError(extractErrorMessage(e));
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="transfer-token-container">
        <Input
          placeholder="Destination address..."
          onChange={(e) => {
            setDestination(e.target.value);
          }}
        />
        <Button onClick={sendToken}>Send Token</Button>
      </div>
    </Modal>
  );
}
