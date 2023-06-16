import React from "react";
import "styles/footer.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthentication,
  setUserIdentity,
  setToken,
} from "features/user.slice";

export default function Footer() {
  const dispatch = useDispatch();
  const isAuthenticate = useSelector((state) => state.user.isAuthenticate);
  function logout() {
    dispatch(setAuthentication(false));
    dispatch(setUserIdentity(""));
    dispatch(setToken(""));
  }
  return (
    <div className="main-footer">
      <div className="social">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 42 42"
        >
          <g
            id="Groupe_27"
            data-name="Groupe 27"
            transform="translate(0 -0.485)"
          >
            <rect
              id="Rectangle_20"
              data-name="Rectangle 20"
              width="42"
              height="42"
              transform="translate(0 0.485)"
              opacity="0"
            />
            <g
              id="Groupe_26"
              data-name="Groupe 26"
              transform="translate(3.54 3.629)"
            >
              <path
                id="Tracé_15"
                data-name="Tracé 15"
                d="M19.7,2a17.691,17.691,0,0,0-2.646,35.185V24.393H12.676V19.739h4.379v-3.1c0-5.127,2.5-7.376,6.759-7.376a24.7,24.7,0,0,1,3.631.22v4.061H24.538c-1.809,0-2.441,1.715-2.441,3.648v2.544h5.3l-.719,4.654H22.1V37.222A17.692,17.692,0,0,0,19.7,2Z"
                transform="translate(-2 -2)"
              />
            </g>
          </g>
        </svg>
        <a href="mailto:winepal.entreprise@gmail.com">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            viewBox="0 0 46 46"
          >
            <g
              id="Groupe_29"
              data-name="Groupe 29"
              transform="translate(0 -0.023)"
            >
              <rect
                id="Rectangle_21"
                data-name="Rectangle 21"
                width="46"
                height="46"
                transform="translate(0 0.023)"
                fill="#232323"
                opacity="0"
              />
              <g
                id="Groupe_28"
                data-name="Groupe 28"
                transform="translate(4.046 8.732)"
              >
                <path
                  id="Tracé_16"
                  data-name="Tracé 16"
                  d="M9.106,16.393V5.662l-.1-.073H9L6.747,3.923a3.532,3.532,0,0,0-4.56.231A4.453,4.453,0,0,0,.86,7.328V10.3Zm21.438-.011v.011L38.789,10.3V7.328a4.456,4.456,0,0,0-1.3-3.158,3.439,3.439,0,0,0-4.472-.332L30.643,5.588l-.1.073ZM10.755,17.6l8.58,6.342a.825.825,0,0,0,.98,0L28.895,17.6V6.881l-9.07,6.706-9.07-6.706Zm19.789.842V30.9a.825.825,0,0,0,.825.825h5.36a2.061,2.061,0,0,0,2.061-2.061V12.347Zm-21.438,0L.86,12.347V29.665a2.061,2.061,0,0,0,2.061,2.061h5.36a.825.825,0,0,0,.825-.825Z"
                  transform="translate(-0.86 -3.165)"
                />
              </g>
            </g>
          </svg>
        </a>
        <a href="#">
          <svg
            fill="#000000"
            width="46"
            height="46"
            viewBox="-5.5 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21.25 14.188v-6.469c0-1.156-0.969-2.125-2.125-2.125h-17c-1.156 0-2.125 0.969-2.125 2.125v6.469h5.156c0.813-2.219 2.969-3.813 5.469-3.813s4.656 1.594 5.469 3.813h5.156zM21.25 16.063h-4.781v0.156c0 3.219-2.625 5.844-5.844 5.844s-5.844-2.625-5.844-5.844v-0.156h-4.781v8.656c0 1.156 0.969 2.125 2.125 2.125h17c1.156 0 2.125-0.969 2.125-2.125v-8.656zM1.844 7.469h1.063v4.875h-1.063v-4.875zM3.969 7.469h1.063v4.875h-1.063v-4.875zM6.094 7.469h1.063v3.063c-0.344 0.25-0.719 0.531-1.063 0.813v-3.875zM10.625 20.219c2.219 0 3.969-1.781 3.969-4s-1.75-3.969-3.969-3.969-4 1.75-4 3.969 1.781 4 4 4zM14.344 7.469h5.031v4.875h-3.375c-0.438-0.656-1.031-1.188-1.656-1.625v-3.25z"></path>
          </svg>
        </a>
        <a href="#">
          <svg
            fill="#000000"
            width="46"
            height="46"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22.396 21.104H21.2v-.707c0-.299.298-.597.596-.597h.103c.302 0 .603.298.603.597v.707h-.106zM17.795 19.6c-.298 0-.6.2-.6.498v3.405c0 .298.205.5.6.5.301 0 .602-.202.602-.5v-3.5c-.002-.203-.301-.403-.602-.403zm7.406-1.9v6.497c0 1.604-1.402 2.803-3.003 2.803H9.797c-1.6 0-2.998-1.3-2.998-2.803V17.7c0-1.599 1.301-2.802 2.998-2.802H22.1c1.699 0 3.101 1.204 3.101 2.802zm-14.502 7.204v-6.809H12.2v-.992H8.1v.992h1.299v6.899l1.3-.09zm4.501-5.8h-1.203v4.492c0 .204-.197.301-.397.301-.101 0-.302-.097-.302-.395v-4.506h-1.3V23.8c0 .298 0 .696.301.899.602.398 1.698-.096 1.901-.697v.795h1v-5.693zm4.098 4.098V20.2c0-1.203-.901-1.899-1.998-.902v-2.299h-1.302v7.799h1.001l.104-.495c1.4 1.295 2.195.397 2.195-1.101zm3.997-.402h-.99v.703c0 .298-.205.5-.509.5h-.198c-.302 0-.494-.202-.494-.5v-1.401h2.191v-2.396c-.193-1.104-1.697-1.309-2.492-.706-.203.202-.408.405-.5.706-.103.3-.207.691-.207 1.294v1.8c0 3.096 3.5 2.705 3.199 0zm-4.9-9.801c.107.203.201.3.303.399.104.104.301.104.501.104.204 0 .298-.104.504-.203.097-.097.3-.3.396-.498v.498H21.5V7.301h-1.104v4.698c0 .301-.192.502-.494.502-.301 0-.498-.201-.498-.502V7.4h-1.198v5.101c.093.197.093.3.189.498zm-4.297-3.397c0-.6 0-1 .103-1.401.097-.3.301-.599.499-.798a1.66 1.66 0 0 1 .999-.301c.3 0 .598.098.803.2.197.101.396.3.498.498.104.203.195.401.301.603 0 .199.102.5.102.998V11c0 .602 0 .999-.102 1.202 0 .299-.104.496-.301.698a1.237 1.237 0 0 1-.498.498 1.86 1.86 0 0 1-.803.201c-.298 0-.599 0-.8-.099-.199-.103-.397-.203-.5-.399a5.108 5.108 0 0 1-.299-.703c-.102-.299-.102-.7-.102-1.197l.1-1.599zm1.102 2.397c0 .301.301.603.601.603.301 0 .596-.302.596-.603V8.798c0-.301-.295-.599-.596-.599-.3 0-.601.298-.601.599v3.201zM11.3 13.6h1.3V9.001L14.2 5h-1.503L11.9 8.001 10.999 5H9.6l1.7 4.001V13.6z" />
          </svg>
        </a>
      </div>
      <div className="link">
        <h3>
          <NavLink to="/wine">VINS</NavLink>
        </h3>
        <h4>|</h4>
        <h3>
          <NavLink to="/pal">PLATS</NavLink>
        </h3>
        <h4>|</h4>
        {!isAuthenticate ? (
          <h3>
            <NavLink to="/login">CONNEXION</NavLink>
          </h3>
        ) : (
          <h3>
            <NavLink onClick={logout}>DECONNEXION</NavLink>
          </h3>
        )}
      </div>
      <div className="copyright">
        <p>
          Winepal | copyright 2023 - Tous droits réservés |{" "}
          <NavLink to="/mention">Mentions légales</NavLink>
        </p>
      </div>
    </div>
  );
}
