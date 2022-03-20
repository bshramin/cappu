import Typography from "@mui/material/Typography";
import Modal from "../Modal";

import "./style.css";

export default function ResultModal({ show, onClose, color, text }) {
  return (
    <Modal show={show} onClose={onClose}>
      <Typography
        id="transition-modal-title"
        variant="h6"
        component="h2"
        color={color}
      >
        {text}
      </Typography>
    </Modal>
  );
}
