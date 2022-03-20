import { useEffect, useState } from "react";
import Web3 from "web3";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "../../../components/Modal";
import { extractErrorMessage } from "../../../helpers/errors";
import { retrieveWalletAddress } from "../../../helpers/connect";
import { CONTACT_ABI, CONTACT_ADDRESS, NETWORK } from "../../../config";
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
      const web3 = new Web3(Web3.givenProvider || NETWORK);
      const cappuContract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
      setContract(cappuContract);
      setAccount(account);
    };

    load();
  }, []);

  const sendToken = async () => {
    try {
      await contract.methods
        .safeSendToken(account, destination, tokenId)
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
