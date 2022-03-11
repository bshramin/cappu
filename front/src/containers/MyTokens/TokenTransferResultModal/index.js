import Typography from "@mui/material/Typography";
import Modal from "../../../components/Modal";

import "./style.css";

export default function TokenTransfer({ show, onClose, result }) {
  return (
    <Modal show={show} onClose={onClose}>
      <Typography
        id="transition-modal-title"
        variant="h6"
        component="h2"
        color={result ? "green" : "red"}
      >
        {result ? "Succeeded" : "Failed"}
      </Typography>
    </Modal>
  );
}
