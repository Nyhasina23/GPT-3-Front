import React from "react";
import "styles/register.css";
import { Button } from "@mui/material";
import { showNavbar } from "features/snackbar.slice";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { setAuthentication, setToken } from "../features/user.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "styles/login.css";
import axios from "axios";
import { apiURL } from "services/apiUrl";

export default function RegisterProAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passconf, setPassconf] = useState();

  async function register() {
    if (
      username === undefined ||
      passconf === undefined ||
      password === undefined
    ) {
      setLoading(false);
      dispatch(
        showNavbar({
          message: "Remplir tous les champs",
          type: "FAIL",
          open: true,
        })
      );
      return;
    } else if (password !== passconf) {
      setLoading(false);
      dispatch(
        showNavbar({
          message: "Mot de passe et confirmation différents",
          type: "FAIL",
          open: true,
        })
      );
    } else {
      setLoading(true);

      await axios
        .post(`${apiURL}/authentication/signup/pro`, {
          username,
          password,
        })
        .then((response) => {
          dispatch(
            showNavbar({
              message: response.data.MESSAGE,
              type: "SUCCESS",
              open: true,
            })
          );
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((err) => {
          dispatch(
            showNavbar({
              message: err.response.data.MESSAGE,
              type: "FAIL",
              open: true,
            })
          );
          setLoading(false);
        });
    }
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

  function showMdp() {
    let password = document.querySelector("#password");
    const attrPass = password.getAttribute("type");
    attrPass === "password"
      ? password.setAttribute("type", "text")
      : password.setAttribute("type", "password");
  }

  function showMdpConf() {
    let password = document.querySelector("#passwordConf");
    const attrPass = password.getAttribute("type");
    attrPass === "password"
      ? password.setAttribute("type", "text")
      : password.setAttribute("type", "password");
  }

  return (
    <div className="main-login">
      <div className="left">
        <div className="left-content">
          <h1>
            {" "}
            <span>Créer </span>un compte pro
          </h1>
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
              variant="contained"
              className="connexion-btn"
              onClick={register}
            >
              {!loading ? (
                <span>Créer un compte Pro</span>
              ) : (
                <LoadingButton className="loadButton" loading></LoadingButton>
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="right-section"></div>
    </div>
  );
}
