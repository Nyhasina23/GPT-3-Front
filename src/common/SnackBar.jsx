import React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { showNavbar } from "../features/snackbar.slice";
import { useSelector } from "react-redux";
import "styles/login.css";

export default function SnackBar() {
  const snackBar = useSelector((state) => state.snackBar.snackBarContent);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(
      showNavbar({
        open: false,
      })
    );
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
        open={snackBar.open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={snackBar.message}
        action={action}
        ContentProps={{
          sx: {
            background: `${snackBar.bg}`,
          },
        }}
      />
    </div>
  );
}
