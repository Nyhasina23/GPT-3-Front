import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "styles/generate.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { showNavbar } from "features/snackbar.slice";
import axios from "axios";
import { apiURL, fileServerAPI } from "services/apiUrl";
import { useNavigate } from "react-router-dom/dist";
import Switch from "@mui/material/Switch";
import { memo } from "react";
import { REQUEST_TYPE } from "constants/request.constant";

const GenerateWithPartenaire = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [vinsOrPlat, setVinOrPlat] = useState(null);
  const [departements, setDepartements] = useState([{}]);
  const [partenaireId, setPartenaireId] = useState(null);
  const [partenaireName, setPartenaireName] = useState(null);

  const [userResponse, setUserResponse] = useState(null);
  const [nomPlat, setNomPlat] = useState(null);
  const [region, setRegion] = useState(null);
  const [robeVin, setRobeVin] = useState(null);
  const [arome, setArome] = useState(null);

  const [minPrice, setMinPrice] = React.useState();
  const [maxPrice, setMaxPrice] = React.useState();

  let errorDetectedCounter = 0;

  let responseGPTStores = [];

  const regionChange = (event) => {
    setRegion(event.target.value);
  };
  const handleRobeVinChange = (event) => {
    setRobeVin(event.target.value);
  };
  const handleAromeChange = (event) => {
    setArome(event.target.value);
  };

  const label = { inputProps: { "aria-label": "advanced search" } };

  function switchToAdvanced() {
    setAdvanced(!advanced);
  }

  const onChangeSelectVinOrPlat = (e) => {
    if (e.target.value === "VINS") {
      setVinOrPlat("VINS");
    } else if (e.target.value === "PLATS") {
      setVinOrPlat("PLATS");
    }
  };

  const handlePartenaireName = async () => {
    if (partenaireId) {
      await axios({
        method: "GET",
        url: `${apiURL}/partenaire/${partenaireId}`,
      })
        .then((response) => {
          setPartenaireName(response?.data?.DATA?.name);
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
    }
  };

  const token = useSelector((state) => state.user.token);
  const isAuthenticate = useSelector((state) => state.user.isAuthenticate);

  const getDepartements = async () => {
    await axios({
      method: "GET",
      url: `${apiURL}/departements`,
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

  // step 1

  const askToGPT = async () => {
    setLoading(true);

    let prompt = `Tu agis comme un caviste professionnel, 
    quelle robe du vin se marie le mieux avec ${nomPlat} ? 
    Ensuite, quelle région est adaptée au ${nomPlat}.
    Retouner juste une réponse au format JSON
    comme {"robeVin" : "robe du vin" , "region" : "région du vin " sans autre formulation de réponse et retourne juste entre Rouge, Blanc et  Rosé pour la robe du vin `;

    if (errorDetectedCounter > 0) {
      const oldRobe = responseGPTStores[responseGPTStores.length - 1].robeVin;
      const oldRegion = responseGPTStores[responseGPTStores.length - 1].region;

      prompt = `Tu agis comme un caviste professionnel, essayer de trouver une autre suggestion de  robe du vin se marie le mieux avec ${nomPlat} apart la robe ${oldRobe}
    Ensuite, quelle région est adaptée au ${nomPlat} apart la région ${oldRegion}.
    Retouner juste une réponse au format JSON
    comme {"robeVin" : "robe du vin" , "region" : "région du vin " sans autre formulation de réponse et retourne juste entre Rouge, Blanc et  Rosé pour la robe du vin `;
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
        setLoading(false);

        //format response GPT to JSON and parse string to JSON object
        const dataToJSON = formatToJSON(response?.data.DATA.message.content);
        const vin = JSON.parse(dataToJSON);

        responseGPTStores.push({
          robeVin: vin.robeVin,
          region: vin.region,
        });

        retriveWineToDB(vin.robeVin, vin.region);
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          showNavbar({
            message: err.response.data.MESSAGE,
            type: "FAIL",
            open: true,
          })
        );
      });
  };

  function formatToJSON(inputString) {
    try {
      const formattedString = inputString.replace(/\n/g, "").trim();
      const jsonObject = JSON.parse(formattedString);
      const jsonString = JSON.stringify(jsonObject, null, 2);
      return jsonString;
    } catch (error) {
      return "Erreur de format JSON : " + error.message;
    }
  }

  // step 2

  const retriveWineToDB = async (robe, regionVin) => {
    setLoading(true);

    let url_query = `partenaireId=${partenaireId}${
      robeVin ? "&robeVin=" + robeVin : "&robeVin=" + robe
    }${region ? "&region=" + region : "&region=" + regionVin}${
      arome ? "&arome=" + arome : ""
    }${minPrice ? "&minPrice=" + minPrice : ""}${
      maxPrice ? "&maxPrice=" + maxPrice : ""
    }
    `;

    await axios
      .get(`${apiURL}/vin/partenaire/suggest/?${url_query}`)
      .then((response) => {
        setLoading(false);

        analyzeDataInGpt(
          response?.data.DATA,
          robeVin,
          region,
          arome,
          minPrice,
          maxPrice
        );
      })
      .catch((err) => {
        // setLoading(false);

        errorDetectedCounter++;

        askToGPT();

        console.log("Oups! une erreur est survenue, veuillez réessayer ");
        console.log("another asking to GPT...");

        // dispatch(
        //   showNavbar({
        //     message: "Oups! une erreur est survenue, veuillez réessayer.",
        //     type: "FAIL",
        //     open: true,
        //   })
        // );
      });
  };

  // step 3

  const analyzeDataInGpt = async (
    dataToAnalyse,
    robeVin,
    region,
    arome,
    minPrice,
    maxPrice
  ) => {
    setLoading(true);

    const prompt = `
    Voici des données au format JSON : 
    "

    ${JSON.stringify(dataToAnalyse)}

    "

    Agis comme un sommelier professionnel, analyse ces données de manière optimale et efficace pour trouver en premier une recommandation générale qui ira parfaitement avec ${nomPlat}. Puis dans un second paragraphe un choix de trois bouteilles différentes issues de trois gammes de prix différents à savoir 0 à 10 euros, 10 à 20 euros et pour finir un prix de 20 euros et plus. (Ne prends pas des vins qui ne sont pas dans la base de données que tu analyses et tries le vin par ordre de prix croissant). Réponds de manière concise, simple et créative sans utiliser plus de 300 mots (ajoutez des interlignes). Mentionne toutes les caractéristiques du vin et le prix à la fin de la réponse. Utilise des emojis si possible et met une phrase sympathique sur WinePal qui remercie l'utilisateur de son utilisation et l'invite à passer un bon moment avec cet accord au final. (NB : Débutes toujours ta réponse par : Pour accompagner ce ${nomPlat})
    
    `;

    await axios
      .post(
        `${apiURL}/gpt3/api/`,
        {
          prompt,
          type: REQUEST_TYPE.ACCORD,
          dataHistory: {
            nomPlat: nomPlat ? nomPlat : null,
            robeVin: robeVin ? robeVin : null,
            region: region ? region : null,
            arome: arome ? arome : null,
            minPrice: minPrice ? minPrice : null,
            maxPrice: maxPrice ? maxPrice : null,
            partenaire: partenaireName ? partenaireName : null,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(async (response) => {
        setLoading(false);
        await axios
          .post(`${fileServerAPI}/history/write`, {
            type: REQUEST_TYPE.ACCORD,
            dataHistory: {
              nomPlat: nomPlat ? nomPlat : null,
              robeVin: robeVin ? robeVin : null,
              region: region ? region : null,
              arome: arome ? arome : null,
              minPrice: minPrice ? minPrice : null,
              maxPrice: maxPrice ? maxPrice : null,
              partenaire: partenaireName ? partenaireName : null,
            },
          })
          .then(() => {
            console.log("write file history done...");
          })
          .catch(() => {
            console.log("error while writing file history...");
          });

        console.log("response ", response.data);

        const textFormated = formatText(response?.data.DATA.message.content);
        setUserResponse(textFormated);
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          showNavbar({
            message: err.response.data.MESSAGE,
            type: "FAIL",
            open: true,
          })
        );
      });
  };

  function formatText(text) {
    text = text.replace(/\n/g, "<br>");
    return text;
  }

  const handleNomPlatChange = (event) => {
    setNomPlat(event?.target.value);
  };

  const saveAccord = async () => {
    let IAResponse = userResponse.replace(/(\r\n|\n|\r)/gm, "");

    setSaveLoading(true);

    await axios
      .post(
        `${apiURL}/accord/create`,
        {
          partenaireId,
          IAResponse,
          plat_name: nomPlat,
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
    <div className="main-plat-accord">
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
                  onClick={handlePartenaireName}
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
                    {/* <option value="">Choississez entre - Vins ou Plats</option> */}
                    <option value="VINS">VINS</option>
                    {/* <option value="PLATS">PLATS</option> */}
                  </select>
                </div>
              )}
              {partenaireId && (
                <div className="input-icon">
                  <input
                    type="text"
                    placeholder="Nom du plat*"
                    onChange={handleNomPlatChange}
                  />
                </div>
              )}
            </div>

            {advanced && (
              <div className="right-form">
                <div className="input-icon flex advanced">
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
                  </div>

                  <div className="input-icon ">
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
                      <option value="Vallée de la Loire">
                        Vallée de la Loire
                      </option>
                      <option value="Lorraine">Lorraine</option>
                      <option value="Sud-Ouest">Sud-Ouest</option>
                      <option value="Savoie-Bugey">Savoie-Bugey</option>
                      <option value="Roussillon">Roussillon</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Arôme du vin"
                    onChange={handleAromeChange}
                  />
                </div>
              </div>
            )}
          </div>
          {advanced && (
            <div className="filter-price">
              <div className="input-icon">
                <input
                  type="number"
                  placeholder="Prix minimum en €"
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="input-icon">
                <input
                  type="number"
                  placeholder="Prix maximum en €"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          )}
          {partenaireId && (
            <div className="advanced-search accord">
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
              onClick={askToGPT}
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
              <div className="head">{/* response */}</div>
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
          {isAuthenticate && (
            <Button
              variant="contained"
              className="save-btn"
              onClick={saveAccord}
            >
              {!saveLoading ? (
                <span> Enregistrer </span>
              ) : (
                <LoadingButton
                  className="loadGenerateButton"
                  loading
                ></LoadingButton>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(GenerateWithPartenaire);
