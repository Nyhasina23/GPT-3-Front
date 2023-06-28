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
import { memo } from "react";

const GenerateWithPartenaire = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [vinsOrPlat, setVinOrPlat] = useState(null);
  const [departements, setDepartements] = useState([{}]);
  const [partenaireId, setPartenaireId] = useState(null);
  const [vinPlatsPlaceHolder, setVinPlatsPlaceHolder] = useState(
    "Liste de plats ou vins selon vos choix"
  );

  const [vinPartenaireList, setVinPartenaireList] = useState([{}]);
  const [platPartenaireList, setPlatPartenaireList] = useState([{}]);
  const [vinPrompt, setVinPrompt] = useState(null);
  const [platPrompt, setPlatPromt] = useState(null);
  const [userResponse, setUserResponse] = useState(null);
  const [vinByDomaine, setVinByDomaine] = useState(null);
  const [platByName, setPlatByName] = useState(null);

  const label = { inputProps: { "aria-label": "advanced search" } };

  function switchToAdvanced() {
    setAdvanced(!advanced);
  }

  const onChangeSelectVinOrPlat = (e) => {
    if (e.target.value === "VINS") {
      setVinPlatsPlaceHolder("Choississez vos vins");
      setVinOrPlat("VINS");
      setPlatPartenaireList(null);
      setPlatByName(null);
      getVinPartenaire(partenaireId);
    } else if (e.target.value === "PLATS") {
      setVinPlatsPlaceHolder("Choississez vos plats");
      setVinOrPlat("PLATS");
      setVinPartenaireList(null);
      setVinByDomaine(null);
      getPlatPartenaire(partenaireId);
    } else {
      setVinPlatsPlaceHolder("Liste de plats ou vins selon vos choix");
      setPlatPartenaireList(null);
      setVinPartenaireList(null);
    }
  };

  const handleChangeUserChoixOnVinOrPlat = async (e) => {
    if (vinsOrPlat === "VINS") {
      setUserResponse(null);
      setPlatPromt(null);
      const vin = await getVinByDomaine(e.target.value);
      setVinPrompt(
        `A la façon d'un sommelier, recommande moi une recette avec ses préparation et les détails  qui irait parfaitement avec ce vin : domaine ${
          vin.data.DATA?.domaine
        } millésime ${vin.data.DATA?.millesime} appellation ${
          vin.data.DATA?.appelation
        } ${vin.data.DATA?.cuve ? "cuvée " + vin.data.DATA?.cuve : ""} ${
          vin.data.DATA?.robeVin
            ? ", la robe est " + vin.data.DATA?.robeVin
            : ""
        } ${
          vin.data.DATA?.acomp
            ? " et à savoir que j'ai déjà prévu un accompagnement qui est " +
              vin.data.DATA?.acomp
            : ""
        }`
      );
    } else if (vinsOrPlat === "PLATS") {
      setUserResponse(null);
      setVinPrompt(null);
      const plat = await getPlatByName(e.target.value);
      setPlatPromt(`Peux-tu me recommander trois vins ${
        plat.data.DATA?.robeVin ? plat.data.DATA?.robeVin : " "
      } ${
        plat.data.DATA?.region
          ? " dans la région " + plat.data.DATA?.region
          : " "
      } ${
        plat.data.DATA?.arome ? " avec l'arôme " + plat.data.DATA?.arome : " "
      } à la façon d'un caviste professionnel 
        dans trois gammes de prix différentes à savoir 0 à 10 euros, 10 à 25 euros et 25 euros et plus pour accompagner 
        ${
          plat.data.DATA?.plat_name
        } ? Et peux-tu recommander un domaine et ou une cuvée spécifique pour chaque vin ? 
        A la fin peux-tu me faire une recommandation générale d’un type vin qui irait bien avec des ${
          plat.data.DATA?.plat_name
        }  ?`);
    }
  };

  const token = useSelector((state) => state.user.token);
  const isAuthenticate = useSelector((state) => state.user.isAuthenticate);

  async function generate() {
    // /gpt3/api/
    setLoading(true);

    if (vinPrompt === null && platPrompt === null) {
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
            prompt: vinPrompt ? vinPrompt : platPrompt,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          dispatch(
            showNavbar({
              message: "Accord généré avec succès",
              type: "SUCCESS",
              open: true,
            })
          );
          const textFormated = formatText(response?.data.DATA);
          setUserResponse(textFormated.slice(8));
          setLoading(false);
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

  const getVinPartenaire = async (partenaireIdentifiant) => {
    await axios({
      method: "GET",
      url: `${apiURL}/vins/partenaire/${partenaireIdentifiant}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setVinPartenaireList(response?.data.DATA);
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

  const getPlatPartenaire = async (partenaireIdentifiant) => {
    await axios({
      method: "GET",
      url: `${apiURL}/plat/partenaire/${partenaireIdentifiant}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setPlatPartenaireList(response?.data.DATA);
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

  const getVinByDomaine = async (domaine) => {
    const vin = await axios({
      method: "GET",
      url: `${apiURL}/vin/${domaine}`,
      headers: {
        Authorization: token,
      },
    });
    setVinByDomaine(vin?.data?.DATA);
    return vin;
  };

  const getPlatByName = async (plat_name) => {
    const plat = await axios({
      method: "GET",
      url: `${apiURL}/plat/${plat_name}`,
      headers: {
        Authorization: token,
      },
    });
    setPlatByName(plat?.data?.DATA);
    return plat;
  };

  const saveAccord = async () => {
    let IAResponse = userResponse.replace(/(\r\n|\n|\r)/gm, "");

    setSaveLoading(true);

    await axios
      .post(
        `${apiURL}/accord/create`,
        {
          partenaireId,
          domaine: vinByDomaine?.domaine,
          cuve: vinByDomaine?.cuve,
          millesime: vinByDomaine?.millesime,
          appelation: vinByDomaine?.appelation,
          acomp: vinByDomaine?.acomp,
          IAResponse,
          plat_name: platByName?.plat_name,
          robeVin: platByName?.robeVin,
          region: platByName?.region,
          arome: platByName?.arome,
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
            message: "Accord Enregisté",
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
                <select
                  name=""
                  id=""
                  className="select"
                  onChange={(e) => setPartenaireId(e.target.value)}
                >
                  <option value="">Sélectionner Supermarché</option>
                  {departements?.map((departement) => (
                    <optgroup label={departement?.name}>
                      {departement?.PartenaireDepartement?.map(
                        (partenaireDep) => (
                          <option value={partenaireDep?._id}>
                            {partenaireDep?.name}
                          </option>
                        )
                      )}
                    </optgroup>
                  ))}
                </select>
              </div>

              {partenaireId && (
                <div className="input-icon">
                  <select className="select" onChange={onChangeSelectVinOrPlat}>
                    <option value="">Choississez entre - Vins ou Plats</option>
                    <option value="VINS">VINS</option>
                    <option value="PLATS">PLATS</option>
                  </select>
                </div>
              )}

              {partenaireId && (
                <div className="input-icon">
                  <select
                    className="select"
                    onChange={handleChangeUserChoixOnVinOrPlat}
                  >
                    <option value="">{vinPlatsPlaceHolder}</option>
                    {vinPartenaireList?.map((vinPartenaire) => (
                      <option value={vinPartenaire?.domaine}>
                        {vinPartenaire?.domaine}
                      </option>
                    ))}
                    {platPartenaireList?.map((platPartenaire) => (
                      <option value={platPartenaire?.plat_name}>
                        {platPartenaire?.plat_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            {/* {advanced && vinsOrPlat === "PLATS" && (
              <div className="right-form">
                <div className="input-icon flex">
                  <select
                    className="select-input"
                    name="Robe"
                    id="Robe-du-vin"
                    placeholder="Robe du vin..."
                    onChange={(e) => setRobeVin(e.target.value)}
                  >
                    <option value="">Robe du vin...</option>
                    <option value="Rouge">Rouge</option>
                    <option value="Blanc">Blanc</option>
                    <option value="Rosé">Rosé</option>
                  </select>
                  <select
                    className="select-input"
                    name="region"
                    placeholder="Région du vin"
                    onChange={(e) => setRegion(e.target.value)}
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
                    <option value="Vallée de la Loire">
                      Vallée de la Loire
                    </option>
                    <option value="Lorraine">Lorraine</option>
                    <option value="Sud-Ouest">Sud-Ouest</option>
                    <option value="Savoie-Bugey">Savoie-Bugey</option>
                    <option value="Roussillon">Roussillon</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Arôme du vin"
                    onChange={(e) => setArome(e.target.value)}
                  />
                </div>
              </div>
            )} */}
            {/* {advanced && vinsOrPlat === "VINS" && (
              <div className="right-form">
                <div className="input-icon flex">
                  <input type="text" placeholder="Millésime" />
                  <input type="text" placeholder="Nom de la cuvée" />
                  <input type="text" placeholder="Appellation" />
                </div>
              </div>
            )} */}
          </div>
          {/* 
          {vinsOrPlat === "PLATS" && (
            <div className="advanced-search">
              <Switch
                {...label}
                className="switch"
                onClick={switchToAdvanced}
              />
              <p>Recherche avancée</p>
            </div>
          )} */}

          <div className="login-btn">
            <Button
              variant="contained"
              className="connexion-btn"
              onClick={generate}
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
                navigate("/compte/user/biblio/accord");
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
                {vinByDomaine?.domaine && (
                  <p className="title"> {vinByDomaine?.domaine} </p>
                )}
                {vinByDomaine?.appelation && (
                  <p className="title"> {vinByDomaine?.appelation} </p>
                )}
                {vinByDomaine?.millesime && (
                  <p className="title"> {vinByDomaine?.millesime} </p>
                )}
                {vinByDomaine?.cuve && (
                  <p className="title"> {vinByDomaine?.cuve} </p>
                )}
                {vinByDomaine?.robeVin && <p> {vinByDomaine?.robeVin} </p>}

                {platByName?.plat_name && (
                  <p className="title"> {platByName?.plat_name} </p>
                )}
                {platByName?.robeVin && (
                  <p className="title"> {platByName?.robeVin} </p>
                )}
                {platByName?.region && (
                  <p className="title"> {platByName?.region} </p>
                )}
                {platByName?.arome && <p> {platByName?.arome} </p>}
              </div>
              {userResponse ? (
                <p
                  className="bodyResponse"
                  dangerouslySetInnerHTML={{ __html: userResponse }}
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
          <Button variant="contained" className="save-btn" onClick={saveAccord}>
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

export default memo(GenerateWithPartenaire);
