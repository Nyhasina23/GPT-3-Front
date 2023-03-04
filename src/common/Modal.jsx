import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import 'styles/modal.css'

const style = {
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

export default function KeepMountedModal({
  title,
  image,
  millesime,
  region,
  cuve,
  appelation,
  cru,
  aromeParfum,
  assemblage,
  recom,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} className="detailsBtn">Details</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} >
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Nom de la cuvée :</span> {cuve}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Millésime :</span> {millesime}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Région du vin :</span> {region}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Appelation :</span>{" "}
            {appelation}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Cru :</span> {cru}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Assemblage :</span>{" "}
            {assemblage}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Arômes et parfums :</span>{" "}
            {aromeParfum}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>
              Recommandations d'accompagnement :
            </span>{" "}
            {recom}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

