import React, { useState, useEffect } from "react";
import "styles/login.css";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setAuthentication,
  setToken,
  setUserIdentity,
} from "../features/user.slice";
import { showNavbar } from "features/snackbar.slice";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [identity, setIdentity] = useState();
  const [password, setPassword] = useState();
  const [passwordShow, setPasswordShow] = useState(false);

  async function login() {
    if (identity === undefined || password === undefined) {
      console.log("Here");
      dispatch(
        showNavbar({
          message: "Remplir tous les champs",
          type: "FAIL",
          open: true,
        })
      );
    } else {
      setLoading(true);

      await axios
        .post(`${apiURL}/authentication/signin`, {
          identity,
          password,
        })
        .then((response) => {
          dispatch(
            showNavbar({
              message: "Connecté avec succès",
              type: "SUCCESS",
              open: true,
            })
          );
          dispatch(setAuthentication(true));
          dispatch(setToken(response.data.DATA.token));
          dispatch(setUserIdentity(response.data.DATA.user.username));
          setTimeout(() => {
            navigate("/wine");
          }, 2000);
        })
        .catch(() => {
          setLoading(false);
          dispatch(
            showNavbar({
              message: "email ou mot de passe incorrecte",
              type: "FAIL",
              open: true,
            })
          );
        });
    }
  }

  function switchToRegister() {
    navigate("/register");
  }

  useEffect(() => {}, []);

  function handleEmailChange(event) {
    setIdentity(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function showMdp(isPasswordShown) {
    console.log("password ", isPasswordShown);
    let password = document.querySelector("#password");
    if (isPasswordShown) {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
    setPasswordShow(isPasswordShown);
  }

  return (
    <div className="main-login">
      <div className="left">
        <div className="left-content">
          <h1>
            {" "}
            <span>Connectez-</span>vous
          </h1>
          <div className="input-icon">
            <input
              type="text"
              placeholder="Votre email..."
              onChange={handleEmailChange}
            />

            <svg
              className="svg-icon-1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <g
                id="Groupe_38"
                data-name="Groupe 38"
                transform="translate(0.32)"
                opacity="0.93"
              >
                <rect
                  id="Rectangle_31"
                  data-name="Rectangle 31"
                  width="32"
                  height="32"
                  transform="translate(-0.32)"
                  fill="#232323"
                  opacity="0"
                />
                <g
                  id="Groupe_37"
                  data-name="Groupe 37"
                  transform="translate(2.64 4.29)"
                >
                  <path
                    id="Tracé_20"
                    data-name="Tracé 20"
                    d="M8.93,3.5A2.325,2.325,0,0,0,6.62,5.81V7.778L3.453,9.663A2.973,2.973,0,0,0,2,12.215V22.31A4.305,4.305,0,0,0,6.29,26.6H24.11a4.305,4.305,0,0,0,4.29-4.29V12.217a2.973,2.973,0,0,0-1.451-2.552h0L23.78,7.78V5.81A2.325,2.325,0,0,0,21.47,3.5Zm0,1.98H21.47a.315.315,0,0,1,.33.33v8.228l-6.6,3.211L8.6,14.038V8.5a.989.989,0,0,0,0-.321V5.81A.315.315,0,0,1,8.93,5.48Zm-2.31,4.6v2.992L4.065,11.833a.981.981,0,0,1,.4-.468Zm17.16,0,2.155,1.281a.985.985,0,0,1,.4.467L23.78,13.075Z"
                    transform="translate(-2 -3.5)"
                    fill="#232323"
                  />
                </g>
              </g>
            </svg>
          </div>

          <div className="input-icon">
            <input
              type="password"
              placeholder="Mot de passe..."
              onChange={handlePasswordChange}
              id="password"
            />
            {!passwordShow && (
              <VisibilityOffIcon
                className="svg-icon-2"
                onClick={() => showMdp(true)}
              />
            )}
            {passwordShow && (
              <VisibilityIcon
                className="svg-icon-2"
                onClick={() => showMdp(false)}
              />
            )}
          </div>

          <div>
            <p
              className="forgot-mdp"
              onClick={() => navigate("/forgot-password")}
            >
              Mot de passe oublié ?
            </p>
          </div>

          <div className="login-btn">
            <Button
              variant="outlined"
              className="register-btn"
              onClick={switchToRegister}
            >
              S'inscrire
            </Button>
            <LoadingButton
              onClick={login}
              loading={loading}
              variant="contained"
              className="connexion-btn"
            >
              <span> Connexion</span>
            </LoadingButton>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}
