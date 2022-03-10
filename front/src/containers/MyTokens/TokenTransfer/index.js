import { useEffect, useState } from "react";
import Web3 from "web3";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { retrieveWalletAddress } from "../../../helpers/connect";
import { CONTACT_ABI, CONTACT_ADDRESS, NETWORK } from "../../../config";
import "./style.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TokenTransfer({ tokenId }) {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState();
  const [modalColor, setModalColor] = useState();
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
    console.log("sending " + tokenId + " to " + destination);
    await contract.methods
      .safeSendToken(account, destination, tokenId)
      .send({ from: account })
      .then(() => {
        setModalText(
          "Successfully sent token " +
            tokenId +
            " to destination " +
            destination
        );
        setModalColor("green");
      })
      .catch((err) => {
        setModalText(
          "Failed to send token " + tokenId + " to destination " + destination
        );
        setModalColor("red");
      });
    setShowModal(true);
  };

  return (
    <div className="transfer-token-container">
      <Input
        placeholder="Destination address..."
        onChange={(e) => {
          setDestination(e.target.value);
        }}
      />
      <Button onClick={sendToken}>Send Token</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <Box sx={modalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {modalText}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
