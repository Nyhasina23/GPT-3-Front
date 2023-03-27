import React from "react";
import "styles/register.css";
import { Button } from "@mui/material";
import SnackBar from "common/SnackBar";
import { showNavbar } from "features/snackbar.slice";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { setAuthentication, setToken } from "../features/user.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "styles/login.css";
import axios from "axios";
import { apiURL } from "services/apiUrl";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [snackBg, setSnackBg] = useState("#4caf50");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passconf, setPassconf] = useState();

  async function register() {
    if (
      email === undefined ||
      username === undefined ||
      passconf === undefined ||
      password === undefined
    ) {
      setOpen(true);
      dispatch(showNavbar(true));
      setErrorMessage("Remplir tous les champs");
      setLoading(false);
      setSnackBg("#f44336");
      return;
    } else if (password != passconf) {
      setOpen(true);
      dispatch(showNavbar(true));
      setErrorMessage("Mot de passe et confirmation différents");
      setLoading(false);
      setSnackBg("#f44336");
    } else {
      setLoading(true);

      await axios
        .post(`${apiURL}/authentication/signup`, {
          email,
          username,
          password,
        })
        .then((response) => {
          setOpen(true);
          dispatch(showNavbar(true));
          setErrorMessage(response.data.MESSAGE);
          dispatch(setAuthentication(true));
          dispatch(setToken(response.data.DATA));
          setSnackBg("#4caf50");
          setTimeout(() => {
            navigate("/wine");
          }, 2000);
        })
        .catch((err) => {
          setOpen(true);
          dispatch(showNavbar(true));
          setErrorMessage(err.response.data.MESSAGE);
          setLoading(false);
          setSnackBg("#f44336");
        });
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handlePasswordConfirmationChange(event) {
    setPassconf(event.target.value);
  }

  function showMdp(){
    let password = document.querySelector('#password');
    const attrPass = password.getAttribute('type');
    attrPass === "password" ? password.setAttribute('type' , 'text') : password.setAttribute('type' , 'password')
  }

  function showMdpConf(){
    let password = document.querySelector('#passwordConf');
    const attrPass = password.getAttribute('type');
    attrPass === "password" ? password.setAttribute('type' , 'text') : password.setAttribute('type' , 'password')
  }

  return (
    <div className="main-login">
      <div className="left">
        <div className="left-content">
          <h1>
            {" "}
            <span>Créer </span>votre compte
          </h1>
          <div className="input-icon">
            <input
              type="email"
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
              type="text"
              placeholder="identifiant..."
              onChange={handleUsernameChange}
            />

            <svg
              className="svg-icon-2"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#232323"
              viewBox="0 0 32 32"
            >
              <g
                id="Groupe_3"
                data-name="Groupe 3"
                transform="translate(0 0.133)"
              >
                <rect
                  id="Rectangle_1"
                  data-name="Rectangle 1"
                  width="32"
                  height="32"
                  transform="translate(0 -0.133)"
                  opacity="0"
                  fill="#232323"
                />
                <g
                  id="Groupe_1"
                  data-name="Groupe 1"
                  transform="translate(2.796 5.142)"
                >
                  <path
                    id="Tracé_1"
                    data-name="Tracé 1"
                    d="M26.961,13.071C26.652,12.644,19.3,2.58,11.685,2.58a10.825,10.825,0,0,0,0,21.651c7.61,0,14.966-10.064,15.276-10.491A.571.571,0,0,0,26.961,13.071ZM16.243,17.963H7.127c0-2.279,2.883-1.96,3.325-3.15a10.559,10.559,0,0,0,.023-1.063,2.074,2.074,0,0,1-.584-1.235c-.145-.012-.373-.153-.44-.712a.522.522,0,0,1,.195-.521c-.49-1.886-.22-3.534,2.016-3.575a1.284,1.284,0,0,1,1.157.444c1.632.227,1.142,2.421.906,3.131a.521.521,0,0,1,.195.521c-.067.558-.3.7-.44.712a2.08,2.08,0,0,1-.57,1.235,10.556,10.556,0,0,0,.023,1.063c.391,1.049,3.093.887,3.313,2.882Z"
                    transform="translate(-0.86 -2.58)"
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

          <div className="input-icon">
            <input
              className="conf-pass"
              type="password"
              placeholder="Confirmation..."
              onChange={handlePasswordConfirmationChange}
              id="passwordConf"
            />

            <svg
              className="svg-icon-2"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              onClick={showMdpConf}
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
              onClick={() => navigate("/login")}
            >
              Connexion
            </Button>
            <Button
              variant="contained"
              className="connexion-btn"
              onClick={register}
            >
              {!loading ? (
                <span> S'inscrire </span>
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
      <div className="right-section"></div>
    </div>
  );
}
