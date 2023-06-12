import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "styles/vin.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { showNavbar } from "features/snackbar.slice";
import SnackBar from "common/SnackBar";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import { useNavigate } from "react-router-dom/dist";
import Switch from "@mui/material/Switch";

export default function Vins() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function switchToPal() {
    navigate("/pal");
  }

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [snackBg, setSnackBg] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [vins, setVins] = useState();
  let [nomPlat, setNomPlat] = useState();
  let [robeVin, setRobeVin] = useState();
  let [arome, setArome] = useState();
  let [allVin, setallVin] = useState([]);
  const [region, setRegion] = useState("");
  const [advanced, setAdvanced] = useState(false);
  const label = { inputProps: { "aria-label": "advanced search" } };
  function switchToAdvanced() {
    setAdvanced(!advanced);
  }
  function handleNomPlatChange(event) {
    setNomPlat(event.target.value);
  }

  function handleRobeVinChange(event) {
    setRobeVin(event.target.value);
  }

  function regionChange(event) {
    setRegion(event.target.value);
  }

  function handleAromeChange(event){
    setArome(event.target.value);
  }

  const token = useSelector((state) => state.user.token);

  async function generateWine() {
    // /gpt3/api/
    setLoading(true);

    if (nomPlat == undefined) {
      setErrorMessage("Veuillez remplir le nom du plat");
      setSnackBg("#f44336");
      dispatch(showNavbar(true));
      setOpen(true);
      setLoading(false);
    } else {
      let prompt = `Peux-tu me recommander trois vins  à la façon d'un caviste professionnel 
      dans trois gammes de prix différentes à savoir 0 à 10 euros, 10 à 25 euros et 25 euros et plus pour accompagner 
      ${nomPlat} ? Et peux-tu recommander un domaine et ou une cuvée spécifique pour chaque vin ? 
      A la fin peux-tu me faire une recommandation générale d’un type vin qui irait bien avec des ${nomPlat}  ?`;

      if (region != undefined && robeVin != undefined && arome != undefined) {
        prompt = `Peux-tu me recommander trois vins ${robeVin} dans la région ${region} avec l'arôme ${arome} à la façon d'un caviste professionnel 
        dans trois gammes de prix différentes à savoir 0 à 10 euros, 10 à 25 euros et 25 euros et plus pour accompagner 
        ${nomPlat} ? Et peux-tu recommander un domaine et ou une cuvée spécifique pour chaque vin ? 
        A la fin peux-tu me faire une recommandation générale d’un type vin qui irait bien avec des ${nomPlat}  ?`;
      }
      await axios
        .post(
          `${apiURL}/gpt3/api/`,
          {
            prompt,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setErrorMessage(response.data.STATUS);
          setSnackBg("#4caf50");
          const textFormated = formatText(response?.data.DATA);
          setVins(textFormated.slice(8));
          dispatch(showNavbar(true));
          setOpen(true);
          setLoading(false);
        })
        .catch((err) => {
          setErrorMessage(err.response.data.MESSAGE);
          setSnackBg("#f44336");
          dispatch(showNavbar(true));
          setOpen(true);
          setLoading(false);
        });
    }
  }

  function formatText(text) {
    // Remplacer les caractères de retour à la ligne par des balises <br>
    text = text.replace(/\n/g, "<br>");

    // Remplacer les espaces par des espaces insécables
    text = text.replace(/ /g, "&nbsp;");

    console.log("text formated => ", text);

    return text;
  }

  async function saveVin() {
    nomPlat = nomPlat.replace(/(\r\n|\n|\r)/gm, "");
    if (robeVin != undefined) {
      robeVin = robeVin.replace(/(\r\n|\n|\r)/gm, "");
    } else {
      robeVin = " ";
    }
    let IAResponse = vins.replace(/(\r\n|\n|\r)/gm, "");

    setSaveLoading(true);
    await axios
      .post(
        `${apiURL}/vin/create`,
        {
          plat_name: nomPlat,
          robeVin,
          IAResponse,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        setErrorMessage(response.data.STATUS);
        setSnackBg("#4caf50");
        dispatch(showNavbar(true));
        setOpen(true);
        setSaveLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.MESSAGE);
        setSnackBg("#f44336");
        dispatch(showNavbar(true));
        setOpen(true);
        setSaveLoading(false);
      });
  }

  async function getAllVins() {
    const response = await axios.get(`${apiURL}/vin/all`, {
      headers: {
        Authorization: token,
      },
    });

    setallVin(response.data.DATA);
  }

  useEffect(() => {
    getAllVins();
  }, []);

  return (
    <div className="main-vin">
      <div className="left-vin">
        <div className="left-vin-content">
          <h1>
            {" "}
            Générez vos <span>vins</span>
          </h1>
          <div className="input-icon">
            <input
              type="text"
              placeholder="Nom du plat*"
              onChange={handleNomPlatChange}
            />

            <svg
              className="svg-icon-1"
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="33"
              viewBox="0 0 33 33"
            >
              <g
                id="Groupe_47"
                data-name="Groupe 47"
                transform="translate(0 -0.031)"
                opacity="0.88"
              >
                <rect
                  id="Rectangle_37"
                  data-name="Rectangle 37"
                  width="33"
                  height="33"
                  transform="translate(0 0.031)"
                  fill="#232323"
                  opacity="0"
                />
                <g
                  id="Groupe_46"
                  data-name="Groupe 46"
                  transform="translate(2.808 5.8)"
                >
                  <g id="Groupe_45" data-name="Groupe 45">
                    <g
                      id="Groupe_43"
                      data-name="Groupe 43"
                      transform="translate(0 16.861)"
                    >
                      <path
                        id="Tracé_23"
                        data-name="Tracé 23"
                        d="M26.273,14.425H1.142a1.142,1.142,0,0,0,0,2.285H2.353a1.142,1.142,0,0,1,.948.5l.514.754a2.285,2.285,0,0,0,1.9,1.028H21.7a2.285,2.285,0,0,0,1.9-1.028l.514-.754a1.142,1.142,0,0,1,.948-.5h1.211a1.142,1.142,0,1,0,0-2.285Z"
                        transform="translate(0 -14.425)"
                        fill="#232323"
                      />
                    </g>
                    <g
                      id="Groupe_44"
                      data-name="Groupe 44"
                      transform="translate(2.856 0)"
                    >
                      <path
                        id="Tracé_24"
                        data-name="Tracé 24"
                        d="M2.646,17.322H23.208a.571.571,0,0,0,.571-.571A10.863,10.863,0,0,0,15.463,6.2a.3.3,0,0,1-.183-.16.32.32,0,0,1,0-.251,2.467,2.467,0,0,0,.228-1.04,2.57,2.57,0,0,0-5.14,0,2.467,2.467,0,0,0,.228,1.04.274.274,0,0,1,0,.251.3.3,0,0,1-.183.149A10.863,10.863,0,0,0,2.075,16.751.571.571,0,0,0,2.646,17.322ZM6.6,10.6a8.921,8.921,0,0,1,5.06-2.627.86.86,0,1,1,.251,1.7,7.083,7.083,0,0,0-4.078,2.068.891.891,0,0,1-.617.263.845.845,0,0,1-.605-.263A.857.857,0,0,1,6.6,10.6Z"
                        transform="translate(-2.075 -2.175)"
                        fill="#232323"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>

          {advanced && (
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
                width="33"
                height="33"
                viewBox="0 0 33 33"
              >
                <g
                  id="Groupe_47"
                  data-name="Groupe 47"
                  transform="translate(0 -0.031)"
                  opacity="0.88"
                >
                  <rect
                    id="Rectangle_37"
                    data-name="Rectangle 37"
                    width="33"
                    height="33"
                    transform="translate(0 0.031)"
                    fill="#232323"
                    opacity="0"
                  />
                  <g
                    id="Groupe_46"
                    data-name="Groupe 46"
                    transform="translate(2.808 5.8)"
                  >
                    <g id="Groupe_45" data-name="Groupe 45">
                      <g
                        id="Groupe_43"
                        data-name="Groupe 43"
                        transform="translate(0 16.861)"
                      >
                        <path
                          id="Tracé_23"
                          data-name="Tracé 23"
                          d="M26.273,14.425H1.142a1.142,1.142,0,0,0,0,2.285H2.353a1.142,1.142,0,0,1,.948.5l.514.754a2.285,2.285,0,0,0,1.9,1.028H21.7a2.285,2.285,0,0,0,1.9-1.028l.514-.754a1.142,1.142,0,0,1,.948-.5h1.211a1.142,1.142,0,1,0,0-2.285Z"
                          transform="translate(0 -14.425)"
                          fill="#232323"
                        />
                      </g>
                      <g
                        id="Groupe_44"
                        data-name="Groupe 44"
                        transform="translate(2.856 0)"
                      >
                        <path
                          id="Tracé_24"
                          data-name="Tracé 24"
                          d="M2.646,17.322H23.208a.571.571,0,0,0,.571-.571A10.863,10.863,0,0,0,15.463,6.2a.3.3,0,0,1-.183-.16.32.32,0,0,1,0-.251,2.467,2.467,0,0,0,.228-1.04,2.57,2.57,0,0,0-5.14,0,2.467,2.467,0,0,0,.228,1.04.274.274,0,0,1,0,.251.3.3,0,0,1-.183.149A10.863,10.863,0,0,0,2.075,16.751.571.571,0,0,0,2.646,17.322ZM6.6,10.6a8.921,8.921,0,0,1,5.06-2.627.86.86,0,1,1,.251,1.7,7.083,7.083,0,0,0-4.078,2.068.891.891,0,0,1-.617.263.845.845,0,0,1-.605-.263A.857.857,0,0,1,6.6,10.6Z"
                          transform="translate(-2.075 -2.175)"
                          fill="#232323"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          )}
          {advanced && (
            <div className="input-icon">
              <select
                className="select-input"
                name="region"
                id="region-du-vin"
                placeholder="Région du vin"
                onChange={regionChange}
              >
                <option value="">Région du vin...</option>
                <option value="Alsace">Alsace</option>
                <option value="Champagne">Champagne</option>
                <option value="Bordeaux">Bordeaux</option>
                <option value="Beaujolais">Beaujolais</option>
                <option value="Jura">Jura</option>
                <option value="Bourgogne">Bourgogne</option>
                <option value="Provence">Provence</option>
                <option value="Corse">Corse</option>
                <option value="Languedoc-Roussillon">
                  Languedoc-Roussillon
                </option>
                <option value="Vallée du Rhône">Vallée du Rhône</option>
                <option value="Vallée de la Loire">Vallée de la Loire</option>
                <option value="Lorraine">Lorraine</option>
                <option value="Sud-Ouest">Sud-Ouest</option>
                <option value="Savoie-Bugey">Savoie-Bugey</option>
                <option value="Roussillon">Roussillon</option>
              </select>

              <svg
                className="svg-icon-1"
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 33 33"
              >
                <g
                  id="Groupe_47"
                  data-name="Groupe 47"
                  transform="translate(0 -0.031)"
                  opacity="0.88"
                >
                  <rect
                    id="Rectangle_37"
                    data-name="Rectangle 37"
                    width="33"
                    height="33"
                    transform="translate(0 0.031)"
                    fill="#232323"
                    opacity="0"
                  />
                  <g
                    id="Groupe_46"
                    data-name="Groupe 46"
                    transform="translate(2.808 5.8)"
                  >
                    <g id="Groupe_45" data-name="Groupe 45">
                      <g
                        id="Groupe_43"
                        data-name="Groupe 43"
                        transform="translate(0 16.861)"
                      >
                        <path
                          id="Tracé_23"
                          data-name="Tracé 23"
                          d="M26.273,14.425H1.142a1.142,1.142,0,0,0,0,2.285H2.353a1.142,1.142,0,0,1,.948.5l.514.754a2.285,2.285,0,0,0,1.9,1.028H21.7a2.285,2.285,0,0,0,1.9-1.028l.514-.754a1.142,1.142,0,0,1,.948-.5h1.211a1.142,1.142,0,1,0,0-2.285Z"
                          transform="translate(0 -14.425)"
                          fill="#232323"
                        />
                      </g>
                      <g
                        id="Groupe_44"
                        data-name="Groupe 44"
                        transform="translate(2.856 0)"
                      >
                        <path
                          id="Tracé_24"
                          data-name="Tracé 24"
                          d="M2.646,17.322H23.208a.571.571,0,0,0,.571-.571A10.863,10.863,0,0,0,15.463,6.2a.3.3,0,0,1-.183-.16.32.32,0,0,1,0-.251,2.467,2.467,0,0,0,.228-1.04,2.57,2.57,0,0,0-5.14,0,2.467,2.467,0,0,0,.228,1.04.274.274,0,0,1,0,.251.3.3,0,0,1-.183.149A10.863,10.863,0,0,0,2.075,16.751.571.571,0,0,0,2.646,17.322ZM6.6,10.6a8.921,8.921,0,0,1,5.06-2.627.86.86,0,1,1,.251,1.7,7.083,7.083,0,0,0-4.078,2.068.891.891,0,0,1-.617.263.845.845,0,0,1-.605-.263A.857.857,0,0,1,6.6,10.6Z"
                          transform="translate(-2.075 -2.175)"
                          fill="#232323"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          )}

          {advanced &&
            <div className="input-icon">
              <input
                type="text"
                placeholder="Arôme..."
                onChange={handleAromeChange}
              />

              <svg
                className="svg-icon-1"
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 33 33"
              >
                <g
                  id="Groupe_47"
                  data-name="Groupe 47"
                  transform="translate(0 -0.031)"
                  opacity="0.88"
                >
                  <rect
                    id="Rectangle_37"
                    data-name="Rectangle 37"
                    width="33"
                    height="33"
                    transform="translate(0 0.031)"
                    fill="#232323"
                    opacity="0"
                  />
                  <g
                    id="Groupe_46"
                    data-name="Groupe 46"
                    transform="translate(2.808 5.8)"
                  >
                    <g id="Groupe_45" data-name="Groupe 45">
                      <g
                        id="Groupe_43"
                        data-name="Groupe 43"
                        transform="translate(0 16.861)"
                      >
                        <path
                          id="Tracé_23"
                          data-name="Tracé 23"
                          d="M26.273,14.425H1.142a1.142,1.142,0,0,0,0,2.285H2.353a1.142,1.142,0,0,1,.948.5l.514.754a2.285,2.285,0,0,0,1.9,1.028H21.7a2.285,2.285,0,0,0,1.9-1.028l.514-.754a1.142,1.142,0,0,1,.948-.5h1.211a1.142,1.142,0,1,0,0-2.285Z"
                          transform="translate(0 -14.425)"
                          fill="#232323"
                        />
                      </g>
                      <g
                        id="Groupe_44"
                        data-name="Groupe 44"
                        transform="translate(2.856 0)"
                      >
                        <path
                          id="Tracé_24"
                          data-name="Tracé 24"
                          d="M2.646,17.322H23.208a.571.571,0,0,0,.571-.571A10.863,10.863,0,0,0,15.463,6.2a.3.3,0,0,1-.183-.16.32.32,0,0,1,0-.251,2.467,2.467,0,0,0,.228-1.04,2.57,2.57,0,0,0-5.14,0,2.467,2.467,0,0,0,.228,1.04.274.274,0,0,1,0,.251.3.3,0,0,1-.183.149A10.863,10.863,0,0,0,2.075,16.751.571.571,0,0,0,2.646,17.322ZM6.6,10.6a8.921,8.921,0,0,1,5.06-2.627.86.86,0,1,1,.251,1.7,7.083,7.083,0,0,0-4.078,2.068.891.891,0,0,1-.617.263.845.845,0,0,1-.605-.263A.857.857,0,0,1,6.6,10.6Z"
                          transform="translate(-2.075 -2.175)"
                          fill="#232323"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          }

          <div className="advanced-search">
            <Switch {...label} className="switch" onClick={switchToAdvanced} />
            <p>Recherche avancée</p>
          </div>
          <div className="login-btn">
            <Button
              variant="outlined"
              className="register-btn"
              onClick={switchToPal}
            >
              Plats
            </Button>
            <Button
              variant="contained"
              className="connexion-btn"
              onClick={generateWine}
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
            {open ? (
              <SnackBar open={open} message={errorMessage} bg={snackBg} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="right">
        <div className="right-content">
          <Button variant="outlined" className="right-btn">
            Vos accords
          </Button>

          <div className="vins-response">
            <h3>
              <svg
                id="Groupe_51"
                data-name="Groupe 51"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <rect
                  id="Rectangle_40"
                  data-name="Rectangle 40"
                  width="24"
                  height="24"
                  fill="#de0941"
                  opacity="0"
                />
                <g
                  id="Groupe_50"
                  data-name="Groupe 50"
                  transform="translate(12 12)"
                >
                  <path
                    id="Tracé_25"
                    data-name="Tracé 25"
                    d="M10,2V4h4V2Zm0,3V7a3.924,3.924,0,0,0-3,4V22H17V11a3.924,3.924,0,0,0-3-4V5Zm1.5,3.313A3.287,3.287,0,0,0,10,11v2h5v4H10v1h5v1H10v1H9V11C9,8.7,11.5,8.313,11.5,8.313Z"
                    transform="translate(-12 -12)"
                    fill="#de0941"
                  />
                </g>
              </svg>
              Ici, les accords mets et vins sont tellement parfaits qu'ils devraient être illégaux !
            </h3>
            <hr />
            <div className="ia-response">
              <div className="head">
                {nomPlat ? <p className="title"> {nomPlat} </p> : ""}
                {robeVin ? <p> Vin {robeVin} </p> : ""}
              </div>
              {vins && (
                <p
                  className="bodyResponse"
                  dangerouslySetInnerHTML={{ __html: vins }}
                ></p>
              )}
              {allVin?.length > 0 || vins ? (
                allVin.map((item) => {
                  return (
                    <div>
                      <div className="head">
                        {<p className="title"> {item.plat_name} </p>}
                        {<p> Vin {item.robeVin} </p>}
                      </div>
                      <p
                        className="bodyResponse"
                        key={item.id}
                        dangerouslySetInnerHTML={{ __html: item.IAResponse }}
                      ></p>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: "#b1b1b1" }}>
                  Prêt pour une aventure gustative ? Tapez votre recherche dans
                  la barre prévue à cet effet et partez à la découverte de notre
                  sélection de vins et de mets raffinés. Bon voyage !
                </p>
              )}
            </div>
          </div>
          <Button variant="contained" className="save-btn" onClick={saveVin}>
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
    </div>
  );
}
