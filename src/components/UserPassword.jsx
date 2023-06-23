import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import { showNavbar } from "features/snackbar.slice";
import { useDispatch, useSelector } from "react-redux";

export default function UserPassword() {
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
        dispatch(
          showNavbar({
            message: "Mot de passe modifiée",
            type: "SUCCESS",
            open: true,
          })
        );
      })
      .catch((error) => {
        dispatch(
          showNavbar({
            message: error.response.data.MESSAGE,
            type: "FAIL",
            open: true,
          })
        );
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
          Enregistrer
        </Button>
      </Stack>
    </Box>
  );
}
