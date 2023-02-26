import React from "react";
import "styles/register.css";
import { Button } from "@mui/material";

export default function Register() {
  return (
    <div className="main-login">
      <div className="left">
        <div className="left-content">
          <h1>
            {" "}
            <span>Créer </span>votre compte
          </h1>
          <div className="input-icon">
            <input type="text" placeholder="Votre email..." />

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
            <input type="password" placeholder="Mot de passe..." />

            <svg
              className="svg-icon-2"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
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
            <input className="conf-pass" type="password" placeholder="Confirmation..." />

            <svg
            className="svg-icon-3"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
            >
              <g
                id="Groupe_42"
                data-name="Groupe 42"
                transform="translate(0 0.096)"
                opacity="0.85"
              >
                <rect
                  id="Rectangle_33"
                  data-name="Rectangle 33"
                  width="30"
                  height="30"
                  transform="translate(0 -0.096)"
                  fill="#232323"
                  opacity="0"
                />
                <g
                  id="Groupe_41"
                  data-name="Groupe 41"
                  transform="translate(5.482 2.523)"
                >
                  <path
                    id="Tracé_22"
                    data-name="Tracé 22"
                    d="M13.27.95a7.087,7.087,0,0,0-7.1,7.1V9.236A2.374,2.374,0,0,0,3.8,11.6V23.441a2.374,2.374,0,0,0,2.367,2.367h14.2a2.374,2.374,0,0,0,2.367-2.367V11.6a2.374,2.374,0,0,0-2.367-2.367V8.052A7.087,7.087,0,0,0,13.27.95Zm0,2.367A4.637,4.637,0,0,1,18,8.052V9.236H8.535V8.052A4.637,4.637,0,0,1,13.27,3.317ZM8.535,16.338a1.184,1.184,0,1,1-1.184,1.184A1.187,1.187,0,0,1,8.535,16.338Zm4.735,0a1.184,1.184,0,1,1-1.184,1.184A1.187,1.187,0,0,1,13.27,16.338Zm4.735,0a1.184,1.184,0,1,1-1.184,1.184A1.187,1.187,0,0,1,18,16.338Z"
                    transform="translate(-3.8 -0.95)"
                    fill="#232323"
                  />
                </g>
              </g>
            </svg>
          </div>

          <div className="login-btn">
            <Button variant="outlined" className="register-btn">
              Connexion
            </Button>
            <Button variant="contained" className="connexion-btn">
              S'inscrire
            </Button>
          </div>
        </div>
      </div>
      <div className="right-section"></div>
    </div>
  );
}
