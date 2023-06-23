import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "styles/plats.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { showNavbar } from "features/snackbar.slice";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import { useNavigate } from "react-router-dom/dist";
import Switch from "@mui/material/Switch";

export const GeneratePartenaire = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function switchToWine() {
    navigate("/wine");
  }

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [vinsOrPlat, setVinOrPlat] = useState("");
  const [departements, setDepartements] = useState([{}]);
  const [vinPlatsPlaceHolder, setVinPlatsPlaceHolder] = useState(
    "Liste de plats ou vins selon vos choix"
  );

  const label = { inputProps: { "aria-label": "advanced search" } };

  function switchToAdvanced() {
    setAdvanced(!advanced);
  }

  const onChangeSelectVinOrPlat = (e) => {
    if (e.target.value === "VINS") {
      setVinPlatsPlaceHolder("Choississez vos vins");
      setVinOrPlat("VINS");
    } else if (e.target.value === "PLATS") {
      setVinPlatsPlaceHolder("Choississez vos plats");
      setVinOrPlat("PLATS");
    } else {
      setVinPlatsPlaceHolder("Liste de plats ou vins selon vos choix");
    }
  };

  const token = useSelector((state) => state.user.token);

  // async function generatePlats() {
  //   // /gpt3/api/
  //   setLoading(true);

  //   if (
  //     domaine == undefined ||
  //     millesime == undefined ||
  //     appelation == undefined
  //   ) {
  //     dispatch(
  //       showNavbar({
  //         message: "Verifier tous les champs obligatoire",
  //         type: "FAIL",
  //         open: true,
  //       })
  //     );
  //     setLoading(false);
  //   } else {
  //     await axios
  //       .post(
  //         `${apiURL}/gpt3/api/`,
  //         {
  //           prompt: `A la façon d'un sommelier, recommande moi une recette avec ses préparation et les détails  qui irait parfaitement avec ce vin : domaine ${domaine} millésime ${millesime} appellation ${appelation} ${
  //             cuve ? "cuvé " + cuve : ""
  //           } ${robeVin ? ", la robe est " + robeVin : ""} ${
  //             recom
  //               ? " et à savoir que j'ai déjà prévu un accompagnement qui est " +
  //                 recom
  //               : ""
  //           }`,
  //         },
  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         dispatch(
  //           showNavbar({
  //             message: "Accord généré avec succès",
  //             type: "SUCCESS",
  //             open: true,
  //           })
  //         );
  //         const textFormated = formatText(response?.data.DATA);
  //         setPlats(textFormated.slice(8));
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         dispatch(
  //           showNavbar({
  //             message: err.response.data.MESSAGE,
  //             type: "FAIL",
  //             open: true,
  //           })
  //         );
  //         setLoading(false);
  //       });
  //   }
  // }

  function formatText(text) {
    text = text.replace(/\n/g, "<br>");
    // text = text.replace(/ /g, "&nbsp;");
    return text;
  }

  const getDepartements = async () => {
    await axios({
      method: "GET",
      url: `${apiURL}/departements`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setDepartements(response?.data.DATA);
      })
      .catch((error) => {
        dispatch(
          showNavbar({
            message: error.response.data.MESSAGE,
            type: "FAIL",
            open: true,
          })
        );
      });
  };

  useEffect(() => {
    getDepartements();
  }, []);

  return (
    <div className="main-plat">
      <div className="left-plat">
        <div className="left-plat-content">
          <h1>
            {" "}
            Générez votre <span>Accord</span>
          </h1>

          <div className="form-input-pal">
            <div className={advanced ? "left-form" : "full-left-form"}>
              <div className="input-icon">
                <select name="" id="" className="select">
                  <option value="">Sélectionner Supermarché</option>
                  {departements?.map((departement) => (
                    <optgroup label={departement?.name}>
                      {departement?.PartenaireDepartement?.map(
                        (partenaireDep) => (
                          <option value={partenaireDep?.name}>
                            {partenaireDep?.name}
                          </option>
                        )
                      )}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="input-icon">
                <select
                  name=""
                  id=""
                  className="select"
                  onChange={onChangeSelectVinOrPlat}
                >
                  <option value="">Choississez entre - Vins ou Plats</option>
                  <option value="VINS">VINS</option>
                  <option value="PLATS">PLATS</option>
                </select>
              </div>

              <div className="input-icon">
                <select name="" id="" className="select">
                  <option value="">{vinPlatsPlaceHolder}</option>
                  <option value="VINS">VINS</option>
                  <option value="PLATS">PLATS</option>
                </select>
              </div>
            </div>
            {advanced && vinsOrPlat === "PLATS" && (
              <div className="right-form">
                <div className="input-icon flex">
                  <input type="text" placeholder="Robe du vin" />
                  <input type="text" placeholder="Région du vin" />
                  <input type="text" placeholder="Arôme du vin" />
                </div>
              </div>
            )}
          </div>

          {vinsOrPlat === "PLATS" && (
            <div className="advanced-search">
              <Switch
                {...label}
                className="switch"
                onClick={switchToAdvanced}
              />
              <p>Recherche avancée</p>
            </div>
          )}

          <div className="login-btn">
            <Button
              variant="contained"
              className="connexion-btn"
              // onClick={generatePlats}
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
          <Button
            variant="outlined"
            className="right-btn"
            onClick={() => {
              navigate("/compte/user/biblio/pal");
            }}
          >
            Vos accords
          </Button>

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
              <div className="head"></div>
              {/* {plats && (
                <p
                  className="bodyResponse"
                  dangerouslySetInnerHTML={{ __html: plats }}
                ></p>
              )} */}
              <p style={{ color: "#b1b1b1" }}>
                Prêt pour une aventure gustative ? Tapez votre recherche dans la
                barre prévue à cet effet et partez à la découverte de notre
                sélection de vins et de mets raffinés. Bon voyage !
              </p>
            </div>
          </div>
          <Button variant="contained" className="save-btn">
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
};
