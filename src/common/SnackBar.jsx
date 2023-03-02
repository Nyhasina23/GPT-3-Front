import React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { showNavbar } from "../features/user.slice";
import { useSelector } from "react-redux";
import "styles/login.css";

export default function SnackBar({message , bg}) {


  const isOpen = useSelector((state) => state.user.showNavbarSuccess);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    dispatch(showNavbar(false));
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        variant="success"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
        action={action}
        ContentProps={{
          sx: {
            background: `${bg}`,
          },
        }}
      />
    </div>
  );
}
