import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import SnackBar from "common/SnackBar";
import { showNavbar } from "features/snackbar.slice";
import { useDispatch, useSelector } from "react-redux";

export default function UserPassword() {
  const [snackBg, setSnackBg] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState();
  const [newPassword, setNewPassword] = React.useState();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const savePassword = async () => {
    await axios
      .put(
        `${apiURL}/user/editPassword`,
        {
          oldPassword: password,
          newPassword,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        setSnackBg("#4caf50");
        setErrorMessage("Mot de passe modifiée ");
        setOpen(true);
        dispatch(showNavbar(true));
      })
      .catch((error) => {
        setSnackBg("#f44336");
        setErrorMessage(error.response.data.MESSAGE);
        setOpen(true);
        dispatch(showNavbar(true));
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        "& > :not(style)": { m: 1 },
      }}
    >
      <Typography variant="h5" mt={1}>
        Mot de passe
      </Typography>
      <TextField
        helperText=" "
        id="demo-helper-text-aligned-no-helper"
        label="Mot de passe actuel"
        onChange={handlePasswordChange}
        value={password}
      />
      <TextField
        helperText=" "
        id="demo-helper-text-aligned-no-helper"
        label="Nouveau mot de passe"
        onChange={handleNewPasswordChange}
        value={newPassword}
      />
      <Stack direction="row" spacing={2}>
        <Button
          onClick={savePassword}
          variant="contained"
          sx={{ background: "#b90837" }}
        >
          Enregister
        </Button>
      </Stack>
      {open ? <SnackBar open={open} message={errorMessage} bg={snackBg} /> : ""}
    </Box>
  );
}
