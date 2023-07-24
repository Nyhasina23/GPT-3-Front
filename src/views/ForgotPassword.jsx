import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import "styles/forgotPassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import { useDispatch } from "react-redux";
import { showNavbar } from "features/snackbar.slice";
import LoadingButton from "@mui/lab/LoadingButton";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = useState();

  const sendCodeToEmail = async () => {
    setLoading(true);
    await axios
      .post(`${apiURL}/user/sendRecovery/`, { email })
      .then(() => {
        setLoading(false);
        navigate(`/reset-password/${email}`);
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
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="forgot-password-main">
      <Typography mb={2} variant="h5" fontWeight={"bold"} textAlign={"center"}>
        Réinitialisation du mot de passe 1/2
      </Typography>
      <Typography mb={2}>
        Pour réinitialiser votre mot de passe, entrer votre email ci-dessous
      </Typography>
      <TextField
        type="email"
        sx={{ marginBottom: "1rem" }}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        onChange={handleEmailChange}
      />
      <LoadingButton
        onClick={sendCodeToEmail}
        loading={loading}
        variant="contained"
        className="load-btn"
      >
        <span> Envoyer le code</span>
      </LoadingButton>
    </div>
  );
}
