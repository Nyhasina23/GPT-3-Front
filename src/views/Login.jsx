import React, { useState, useEffect } from "react";
import "styles/login.css";
import { Button } from "@mui/material";
import SnackBar from "common/SnackBar";
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

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [identity, setIdentity] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [snackBg, setSnackBg] = useState("#4caf50");

  async function login() {
    if (identity === undefined || password === undefined) {
      setOpen(true);

      dispatch(showNavbar(true));
      setErrorMessage("Remplir tous les champs");
      setLoading(false);
      setSnackBg("#f44336");
    } else {
      setOpen(true);
      dispatch(showNavbar(true));
      setLoading(true);

      await axios
        .post(`${apiURL}/authentication/signin`, {
          identity,
          password,
        })
        .then((response) => {
          setOpen(true);

          setErrorMessage("Connecté avec succès");
          dispatch(setAuthentication(true));
          setSnackBg("#4caf50");
          dispatch(setToken(response.data.DATA.token));
          dispatch(setUserIdentity(response.data.DATA.user.username));
          setTimeout(() => {
            navigate("/wine");
          }, 2000);
        })
        .catch(() => {
          setOpen(true);

          setErrorMessage("email ou mot de passe incorrecte");
          setLoading(false);
          setSnackBg("#f44336");
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

  function showMdp(){
    let password = document.querySelector('#password');
    const attrPass = password.getAttribute('type');
    attrPass === "password" ? password.setAttribute('type' , 'text') : password.setAttribute('type' , 'password')
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

            <svg
              className="svg-icon-2"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              onClick={showMdp}
            >
              <g
                id="Groupe_40"
                data-name="Groupe 40"
                transform="translate(-0.149)"
                opacity="0.86"
              >
                <rect
                  id="Rectangle_32"
                  data-name="Rectangle 32"
                  width="32"
                  height="32"
                  transform="translate(0.149)"
                  fill="#232323"
                  opacity="0"
                />
                <g
                  id="Groupe_39"
                  data-name="Groupe 39"
                  transform="translate(2.627 7.096)"
                >
                  <path
                    id="Tracé_21"
                    data-name="Tracé 21"
                    d="M13.455,3.35c-8,0-13.167,8.263-13.261,8.413a.895.895,0,0,0-.049,1.046l0,.005c.015.032,4.353,8.476,13.306,8.476,8.915,0,13.247-8.361,13.3-8.464l.01-.018a.9.9,0,0,0-.047-1.044l0,0C26.623,11.613,21.455,3.35,13.455,3.35Zm0,2.691A6.279,6.279,0,1,1,7.176,12.32,6.279,6.279,0,0,1,13.455,6.041Zm0,3.588a2.691,2.691,0,1,0,2.691,2.691A2.691,2.691,0,0,0,13.455,9.629Z"
                    transform="translate(0 -3.35)"
                    fill="#232323"
                  />
                </g>
              </g>
            </svg>
          </div>

          <div className="login-btn">
            <Button
              variant="outlined"
              className="register-btn"
              onClick={switchToRegister}
            >
              S'inscrire
            </Button>
            <Button
              variant="contained"
              className="connexion-btn"
              onClick={login}
            >
              {!loading ? (
                <span> Connexion </span>
              ) : (
                <LoadingButton className="loadButton" loading></LoadingButton>
              )}
            </Button>

            {open ? (
              <SnackBar open={open} message={errorMessage} bg={snackBg} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}
