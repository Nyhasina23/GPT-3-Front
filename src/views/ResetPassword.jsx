import React, { useState } from "react";
import "styles/forgotPassword.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNavbar } from "features/snackbar.slice";
import LoadingButton from "@mui/lab/LoadingButton";
import winepal from "assets/images/winepal_logo.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useParams();
  const [code, setCode] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = React.useState(false);
  const [passwordConf, setPasswordConf] = useState();

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfChange = (e) => {
    setPasswordConf(e.target.value);
  };

  const changePassword = async () => {
    setLoading(true);
    if (password === passwordConf) {
      await axios
        .put(`${apiURL}/user/passwordRecovery`, {
          email,
          recoveryCode: code,
          newPassword: password,
        })
        .then(() => {
          setLoading(false);

          dispatch(
            showNavbar({
              message: "Votre mot de passe a été réinitialisé",
              type: "SUCCESS",
              open: true,
            })
          );
          setTimeout(() => {
            navigate(`/login`);
          }, 2000);
        })
        .catch((err) => {
          setLoading(false);

          dispatch(
            showNavbar({
              message: err.response.data.MESSAGE,
              type: "FAIL",
              open: true,
            })
          );
        });
    } else {
      setLoading(false);

      dispatch(
        showNavbar({
          message: "Le mot de passe ne correspond pas! ",
          type: "FAIL",
          open: true,
        })
      );
    }
  };
  return (
    <div className="reset-password-main">
      <img src={winepal} alt="winepal_logo" className="logo-winepal" />
      <Typography mb={2} variant="h5" fontWeight={"bold"} textAlign={"center"}>
        Réinitialisation du mot de passe 2/2
      </Typography>
      <Typography mb={2}>
        Veuillez entrer le code de confirmation que nous avons envoyé à{" "}
        <span style={{ fontWeight: "bold" }}>{email}.</span>
      </Typography>
      <TextField
        sx={{ marginBottom: "1rem" }}
        id="outlined-basic"
        label="Code de confirmation"
        variant="outlined"
        onChange={handleCodeChange}
      />
      <TextField
        sx={{ marginBottom: "1rem" }}
        id="outlined-basic"
        label="Nouveau mot de passe"
        variant="outlined"
        onChange={handlePasswordChange}
      />
      <TextField
        sx={{ marginBottom: "1rem" }}
        id="outlined-basic"
        label="Confirmation du mot de passe"
        variant="outlined"
        onChange={handlePasswordConfChange}
      />

      <LoadingButton
        onClick={changePassword}
        loading={loading}
        variant="contained"
        className="load-btn"
      >
        <span> Changer mot de passe</span>
      </LoadingButton>
    </div>
  );
}
