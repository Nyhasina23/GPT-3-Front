import React, { useState } from "react";
import { Button } from "@mui/material";
import "styles/plats.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { showNavbar } from "features/snackbar.slice";
import axios from "axios";
import { apiURL, fileServerAPI } from "services/apiUrl";
import { useNavigate } from "react-router-dom/dist";
import Switch from "@mui/material/Switch";
import InformationCard from "components/InformationCard";
import { REQUEST_TYPE } from "constants/request.constant";

export default function Plats() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function switchToWine() {
    navigate("/wine");
  }

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [domaine, setDomaine] = useState();
  const [cuve, setCuve] = useState();
  const [millesime, setMillesime] = useState();
  const [robeVin, setRobeVin] = useState();
  const [appelation, setAppelation] = useState();
  const [recom, setRecom] = useState();
  const [plats, setPlats] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [advanced, setAdvanced] = useState(false);

  function domaineChange(event) {
    setDomaine(event.target.value);
  }
  function cuveChange(event) {
    setCuve(event.target.value);
  }
  function millesimeChange(event) {
    setMillesime(event.target.value);
  }
  function handleRobeVinChange(event) {
    setRobeVin(event.target.value);
  }
  function appelationChange(event) {
    setAppelation(event.target.value);
  }
  function recomChange(event) {
    setRecom(event.target.value);
  }

  const token = useSelector((state) => state.user.token);
  const isAuthenticate = useSelector((state) => state.user.isAuthenticate);

  async function generatePlats() {
    // /gpt3/api/
    setLoading(true);

    if (
      domaine == undefined ||
      millesime == undefined ||
      appelation == undefined
    ) {
      dispatch(
        showNavbar({
          message: "Verifier tous les champs obligatoire",
          type: "FAIL",
          open: true,
        })
      );
      setLoading(false);
    } else {
      await axios
        .post(
          `${apiURL}/gpt3/api/`,
          {
            prompt: `A la façon d'un sommelier, recommande moi une recette avec ses préparation et les détails  qui irait parfaitement avec ce vin : domaine ${domaine} , millésime ${millesime} , appellation ${appelation} ${
              cuve ? " , cuvée " + cuve : ""
            } ${robeVin ? " , la robe est " + robeVin : ""} ${
              recom
                ? " et à savoir que j'ai déjà prévu un accompagnement qui est " +
                  recom
                : ""
            }`,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(async (response) => {
          console.log("response plats ", response);

          dispatch(
            showNavbar({
              message: "Accord généré avec succès",
              type: "SUCCESS",
              open: true,
            })
          );

          await axios
            .post(`${fileServerAPI}/history/write`, {
              type: REQUEST_TYPE.PLATS,
              dataHistory: {
                domaine: domaine ? domaine : null,
                millesime: millesime ? millesime : null,
                appelation: appelation ? appelation : null,
                cuve: cuve ? cuve : null,
                robeVin: robeVin ? robeVin : null,
                recom: recom ? recom : null,
              },
            })
            .then((response) => {
              console.log("write file history done...", response);
            })
            .catch(() => {
              console.log("error while writing file history...");
            });

            
          const textFormated = formatText(response?.data.DATA.message.content);
          setPlats(textFormated);
          setLoading(false);
        })
        .catch((err) => {
          console.log("error response plats ", err);

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

  function formatText(text) {
    text = text.replace(/\n/g, "<br>");
    // text = text.replace(/ /g, "&nbsp;");
    return text;
  }

  async function savePlat() {
    let IAResponse = plats.replace(/(\r\n|\n|\r)/gm, "");

    setSaveLoading(true);

    await axios
      .post(
        `${apiURL}/recipe/create`,
        {
          domaine,
          cuve,
          millesime,
          appelation,
          recom,
          IAResponse,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        dispatch(
          showNavbar({
            message: "Enregisté",
            type: "SUCCESS",
            open: true,
          })
        );
        setSaveLoading(false);
      })
      .catch((err) => {
        dispatch(
          showNavbar({
            message: err.response.data.MESSAGE,
            type: "FAIL",
            open: true,
          })
        );
        setSaveLoading(false);
      });
  }

  const label = { inputProps: { "aria-label": "advanced search" } };

  function switchToAdvanced() {
    setAdvanced(!advanced);
  }
  function handleClickInfo() {
    setShowInfo(true);
  }
  function closeInfoCard() {
    setShowInfo(false);
  }

  return (
    <div className="main-plat">
      <div className="left-plat">
        <div className="left-plat-content">
          <h1>
            {" "}
            Générez vos <span>Plats</span>
          </h1>

          <div className="form-input-pal">
            <div className={advanced ? "left-form" : "full-left-form"}>
              <div className="input-icon">
                <input
                  type="text"
                  placeholder="Nom du domaine*"
                  onChange={domaineChange}
                />

                <svg
                  className="svg-icon-info"
                  width="28"
                  height="28"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleClickInfo}
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                      <rect width="48" height="48" fill="none" />
                    </g>
                    <g id="icons_Q2" data-name="icons Q2">
                      <path
                        fill="#BDBDBD"
                        d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Zm0,40A18,18,0,1,1,42,24,18.1,18.1,0,0,1,24,42Z"
                      />
                      <path
                        fill="#BDBDBD"
                        d="M24,20a2,2,0,0,0-2,2V34a2,2,0,0,0,4,0V22A2,2,0,0,0,24,20Z"
                      />
                      <circle fill="#BDBDBD" cx="24" cy="14" r="2" />
                    </g>
                  </g>
                </svg>

                <svg
                  className="svg-icon-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                >
                  <g
                    id="Groupe_51"
                    data-name="Groupe 51"
                    transform="translate(0.446 -0.787)"
                    opacity="0.92"
                  >
                    <rect
                      id="Rectangle_40"
                      data-name="Rectangle 40"
                      width="34"
                      height="34"
                      transform="translate(-0.446 0.787)"
                      fill="#232323"
                      opacity="0"
                    />
                    <g
                      id="Groupe_50"
                      data-name="Groupe 50"
                      transform="translate(9.954 2.814)"
                    >
                      <path
                        id="Tracé_25"
                        data-name="Tracé 25"
                        d="M11.315,2V4.876h5.753V2Zm0,4.315V9.191A5.644,5.644,0,0,0,7,14.944v15.82H21.382V14.944a5.644,5.644,0,0,0-4.315-5.753V6.315Zm2.157,4.764a4.728,4.728,0,0,0-2.157,3.865V17.82h7.191v5.753H11.315v1.438h7.191v1.438H11.315v1.438H9.876V14.944C9.876,11.635,13.472,11.079,13.472,11.079Z"
                        transform="translate(-7 -2)"
                        fill="#232323"
                      />
                    </g>
                  </g>
                </svg>
              </div>

              <div className="input-icon">
                <input
                  type="text"
                  placeholder="Appellation*"
                  onChange={appelationChange}
                />

                <svg
                  className="svg-icon-info"
                  width="28"
                  height="28"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleClickInfo}
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                      <rect width="48" height="48" fill="none" />
                    </g>
                    <g id="icons_Q2" data-name="icons Q2">
                      <path
                        fill="#BDBDBD"
                        d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Zm0,40A18,18,0,1,1,42,24,18.1,18.1,0,0,1,24,42Z"
                      />
                      <path
                        fill="#BDBDBD"
                        d="M24,20a2,2,0,0,0-2,2V34a2,2,0,0,0,4,0V22A2,2,0,0,0,24,20Z"
                      />
                      <circle fill="#BDBDBD" cx="24" cy="14" r="2" />
                    </g>
                  </g>
                </svg>

                <svg
                  className="svg-icon-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                >
                  <g
                    id="Groupe_51"
                    data-name="Groupe 51"
                    transform="translate(0.446 -0.787)"
                    opacity="0.92"
                  >
                    <rect
                      id="Rectangle_40"
                      data-name="Rectangle 40"
                      width="34"
                      height="34"
                      transform="translate(-0.446 0.787)"
                      fill="#232323"
                      opacity="0"
                    />
                    <g
                      id="Groupe_50"
                      data-name="Groupe 50"
                      transform="translate(9.954 2.814)"
                    >
                      <path
                        id="Tracé_25"
                        data-name="Tracé 25"
                        d="M11.315,2V4.876h5.753V2Zm0,4.315V9.191A5.644,5.644,0,0,0,7,14.944v15.82H21.382V14.944a5.644,5.644,0,0,0-4.315-5.753V6.315Zm2.157,4.764a4.728,4.728,0,0,0-2.157,3.865V17.82h7.191v5.753H11.315v1.438h7.191v1.438H11.315v1.438H9.876V14.944C9.876,11.635,13.472,11.079,13.472,11.079Z"
                        transform="translate(-7 -2)"
                        fill="#232323"
                      />
                    </g>
                  </g>
                </svg>
              </div>

              <div className="input-icon">
                <input
                  type="text"
                  placeholder="Millésime*"
                  onChange={millesimeChange}
                />

                <svg
                  className="svg-icon-info"
                  width="28"
                  height="28"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleClickInfo}
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                      <rect width="48" height="48" fill="none" />
                    </g>
                    <g id="icons_Q2" data-name="icons Q2">
                      <path
                        fill="#BDBDBD"
                        d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Zm0,40A18,18,0,1,1,42,24,18.1,18.1,0,0,1,24,42Z"
                      />
                      <path
                        fill="#BDBDBD"
                        d="M24,20a2,2,0,0,0-2,2V34a2,2,0,0,0,4,0V22A2,2,0,0,0,24,20Z"
                      />
                      <circle fill="#BDBDBD" cx="24" cy="14" r="2" />
                    </g>
                  </g>
                </svg>

                <svg
                  className="svg-icon-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                >
                  <g
                    id="Groupe_51"
                    data-name="Groupe 51"
                    transform="translate(0.446 -0.787)"
                    opacity="0.92"
                  >
                    <rect
                      id="Rectangle_40"
                      data-name="Rectangle 40"
                      width="34"
                      height="34"
                      transform="translate(-0.446 0.787)"
                      fill="#232323"
                      opacity="0"
                    />
                    <g
                      id="Groupe_50"
                      data-name="Groupe 50"
                      transform="translate(9.954 2.814)"
                    >
                      <path
                        id="Tracé_25"
                        data-name="Tracé 25"
                        d="M11.315,2V4.876h5.753V2Zm0,4.315V9.191A5.644,5.644,0,0,0,7,14.944v15.82H21.382V14.944a5.644,5.644,0,0,0-4.315-5.753V6.315Zm2.157,4.764a4.728,4.728,0,0,0-2.157,3.865V17.82h7.191v5.753H11.315v1.438h7.191v1.438H11.315v1.438H9.876V14.944C9.876,11.635,13.472,11.079,13.472,11.079Z"
                        transform="translate(-7 -2)"
                        fill="#232323"
                      />
                    </g>
                  </g>
                </svg>
              </div>

              <div className="input-icon">
                <input
                  type="text"
                  placeholder="Nom de la cuvée"
                  onChange={cuveChange}
                />

                <svg
                  className="svg-icon-info"
                  width="28"
                  height="28"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleClickInfo}
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                      <rect width="48" height="48" fill="none" />
                    </g>
                    <g id="icons_Q2" data-name="icons Q2">
                      <path
                        fill="#BDBDBD"
                        d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Zm0,40A18,18,0,1,1,42,24,18.1,18.1,0,0,1,24,42Z"
                      />
                      <path
                        fill="#BDBDBD"
                        d="M24,20a2,2,0,0,0-2,2V34a2,2,0,0,0,4,0V22A2,2,0,0,0,24,20Z"
                      />
                      <circle fill="#BDBDBD" cx="24" cy="14" r="2" />
                    </g>
                  </g>
                </svg>

                <svg
                  className="svg-icon-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                >
                  <g
                    id="Groupe_51"
                    data-name="Groupe 51"
                    transform="translate(0.446 -0.787)"
                    opacity="0.92"
                  >
                    <rect
                      id="Rectangle_40"
                      data-name="Rectangle 40"
                      width="34"
                      height="34"
                      transform="translate(-0.446 0.787)"
                      fill="#232323"
                      opacity="0"
                    />
                    <g
                      id="Groupe_50"
                      data-name="Groupe 50"
                      transform="translate(9.954 2.814)"
                    >
                      <path
                        id="Tracé_25"
                        data-name="Tracé 25"
                        d="M11.315,2V4.876h5.753V2Zm0,4.315V9.191A5.644,5.644,0,0,0,7,14.944v15.82H21.382V14.944a5.644,5.644,0,0,0-4.315-5.753V6.315Zm2.157,4.764a4.728,4.728,0,0,0-2.157,3.865V17.82h7.191v5.753H11.315v1.438h7.191v1.438H11.315v1.438H9.876V14.944C9.876,11.635,13.472,11.079,13.472,11.079Z"
                        transform="translate(-7 -2)"
                        fill="#232323"
                      />
                    </g>
                  </g>
                </svg>
              </div>

              <div className="input-icon">
                <select
                  className="select-input"
                  name="Robe"
                  id="Robe-du-vin"
                  placeholder="Robe du vin..."
                  onChange={handleRobeVinChange}
                >
                  <option value="">Robe du vin...</option>
                  <option value="Rouge">Rouge</option>
                  <option value="Blanc">Blanc</option>
                  <option value="Rosé">Rosé</option>
                </select>
                <svg
                  className="svg-icon-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                >
                  <g
                    id="Groupe_51"
                    data-name="Groupe 51"
                    transform="translate(0.446 -0.787)"
                    opacity="0.92"
                  >
                    <rect
                      id="Rectangle_40"
                      data-name="Rectangle 40"
                      width="34"
                      height="34"
                      transform="translate(-0.446 0.787)"
                      fill="#232323"
                      opacity="0"
                    />
                    <g
                      id="Groupe_50"
                      data-name="Groupe 50"
                      transform="translate(9.954 2.814)"
                    >
                      <path
                        id="Tracé_25"
                        data-name="Tracé 25"
                        d="M11.315,2V4.876h5.753V2Zm0,4.315V9.191A5.644,5.644,0,0,0,7,14.944v15.82H21.382V14.944a5.644,5.644,0,0,0-4.315-5.753V6.315Zm2.157,4.764a4.728,4.728,0,0,0-2.157,3.865V17.82h7.191v5.753H11.315v1.438h7.191v1.438H11.315v1.438H9.876V14.944C9.876,11.635,13.472,11.079,13.472,11.079Z"
                        transform="translate(-7 -2)"
                        fill="#232323"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            {advanced && (
              <div className="right-form">
                <div className="input-icon">
                  <input
                    type="text"
                    placeholder="Accompagnement.."
                    onChange={recomChange}
                  />

                  <svg
                    className="svg-icon-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                  >
                    <g
                      id="Groupe_51"
                      data-name="Groupe 51"
                      transform="translate(0.446 -0.787)"
                      opacity="0.92"
                    >
                      <rect
                        id="Rectangle_40"
                        data-name="Rectangle 40"
                        width="34"
                        height="34"
                        transform="translate(-0.446 0.787)"
                        fill="#232323"
                        opacity="0"
                      />
                      <g
                        id="Groupe_50"
                        data-name="Groupe 50"
                        transform="translate(9.954 2.814)"
                      >
                        <path
                          id="Tracé_25"
                          data-name="Tracé 25"
                          d="M11.315,2V4.876h5.753V2Zm0,4.315V9.191A5.644,5.644,0,0,0,7,14.944v15.82H21.382V14.944a5.644,5.644,0,0,0-4.315-5.753V6.315Zm2.157,4.764a4.728,4.728,0,0,0-2.157,3.865V17.82h7.191v5.753H11.315v1.438h7.191v1.438H11.315v1.438H9.876V14.944C9.876,11.635,13.472,11.079,13.472,11.079Z"
                          transform="translate(-7 -2)"
                          fill="#232323"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div className="advanced-search">
            <Switch {...label} className="switch" onClick={switchToAdvanced} />
            <p>Recherche avancée</p>
          </div>

          <div className="login-btn">
            <Button
              variant="outlined"
              className="register-btn"
              onClick={switchToWine}
            >
              Vins
            </Button>
            <Button
              variant="contained"
              className="connexion-btn"
              onClick={generatePlats}
            >
              {!loading ? (
                <span> Générez </span>
              ) : (
                <LoadingButton
                  className="loadGenerateButton"
                  loading
                ></LoadingButton>
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="right-content">
          {isAuthenticate && (
            <Button
              variant="outlined"
              className="right-btn"
              onClick={() => {
                navigate("/compte/user/biblio/pal");
              }}
            >
              Vos accords
            </Button>
          )}

          <div className="vins-response">
            <h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
              >
                <g
                  id="Groupe_52"
                  data-name="Groupe 52"
                  transform="translate(0 0.126)"
                  opacity="0.88"
                >
                  <rect
                    id="Rectangle_37"
                    data-name="Rectangle 37"
                    width="23"
                    height="23"
                    transform="translate(0 -0.126)"
                    fill="#de0941"
                    opacity="0"
                  />
                  <g
                    id="Groupe_46"
                    data-name="Groupe 46"
                    transform="translate(1.922 3.994)"
                  >
                    <g
                      id="Groupe_45"
                      data-name="Groupe 45"
                      transform="translate(0 0)"
                    >
                      <g
                        id="Groupe_43"
                        data-name="Groupe 43"
                        transform="translate(0 11.542)"
                      >
                        <path
                          id="Tracé_23"
                          data-name="Tracé 23"
                          d="M17.986,14.425H.782a.782.782,0,0,0,0,1.564h.829a.782.782,0,0,1,.649.344l.352.516a1.564,1.564,0,0,0,1.3.7H14.858a1.564,1.564,0,0,0,1.3-.7l.352-.516a.782.782,0,0,1,.649-.344h.829a.782.782,0,0,0,0-1.564Z"
                          transform="translate(0 -14.425)"
                          fill="#de0941"
                        />
                      </g>
                      <g
                        id="Groupe_44"
                        data-name="Groupe 44"
                        transform="translate(1.955)"
                      >
                        <path
                          id="Tracé_24"
                          data-name="Tracé 24"
                          d="M2.466,12.544H16.542a.391.391,0,0,0,.391-.391A7.437,7.437,0,0,0,11.24,4.927a.2.2,0,0,1-.125-.109.219.219,0,0,1,0-.172,1.689,1.689,0,0,0,.156-.712,1.76,1.76,0,0,0-3.519,0,1.689,1.689,0,0,0,.156.712.188.188,0,0,1,0,.172.2.2,0,0,1-.125.1,7.437,7.437,0,0,0-5.709,7.234A.391.391,0,0,0,2.466,12.544Zm2.706-4.6a6.107,6.107,0,0,1,3.464-1.8.589.589,0,0,1,.172,1.165A4.849,4.849,0,0,0,6.016,8.728a.61.61,0,0,1-.422.18.579.579,0,0,1-.414-.18A.587.587,0,0,1,5.172,7.946Z"
                          transform="translate(-2.075 -2.175)"
                          fill="#de0941"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              Ici, les accords mets et vins sont tellement parfaits qu'ils
              devraient être illégaux !
            </h3>
            <hr />
            <div className="ia-response-plat">
              <div className="head">
                {domaine ? <p className="title"> {domaine} </p> : ""}
                {appelation ? <p className="title"> {appelation} </p> : ""}
                {millesime ? <p className="title"> {millesime} </p> : ""}
                {cuve ? <p className="title"> {cuve} </p> : ""}
                {robeVin ? <p className="title"> {robeVin} </p> : ""}
                {recom ? <p> {recom} </p> : ""}
              </div>
              {plats ? (
                <p
                  className="bodyResponse"
                  dangerouslySetInnerHTML={{ __html: plats }}
                ></p>
              ) : (
                <p style={{ color: "#b1b1b1" }}>
                  Prêt pour une aventure gustative ? Tapez votre recherche dans
                  la barre prévue à cet effet et partez à la découverte de notre
                  sélection de vins et de mets raffinés. Bon voyage !
                </p>
              )}
            </div>
          </div>
          <Button variant="contained" className="save-btn" onClick={savePlat}>
            {!saveLoading ? (
              <span> Enregistrer </span>
            ) : (
              <LoadingButton
                className="loadGenerateButton"
                loading
              ></LoadingButton>
            )}
          </Button>
        </div>
      </div>
      {showInfo && (
        <InformationCard className="info-card" closeInfoCard={closeInfoCard} />
      )}
      {showInfo && <div className="info-card-overlay"></div>}
    </div>
  );
}
