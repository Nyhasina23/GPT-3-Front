import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "styles/generate.css";
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

  const [userResponse, setUserResponse] = useState(null);
  const [nomPlat, setNomPlat] = useState(null);
  const [region, setRegion] = useState(null);
  const [robeVin, setRobeVin] = useState(null);
  const [arome, setArome] = useState(null);

  const [minPrice, setMinPrice] = React.useState();
  const [maxPrice, setMaxPrice] = React.useState();

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

    const prompt = `Tu agis comme un caviste professionnel, 
    quelle robe du vin se marie le mieux avec ${nomPlat} ? 
    Ensuite, quelle région est adaptée au ${nomPlat}. 
    Enfin, quels arômes se marient le mieux avec le ${nomPlat}.
    Retouner juste une réponse au format JSON
    comme {"robeVin" : "robe du vin" , "region" : "région du vin " , "arome" : "arôme du vin" "}
    sans autre formulation de réponse et retourne juste entre Rouge, Blanc et  Rosé pour la robe du vin `;

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
        console.log("response ask GPT ", response);

        //format response GPT to JSON and parse string to JSON object
        const dataToJSON = formatToJSON(response?.data.DATA);
        const vin = JSON.parse(dataToJSON);

        retriveWineToDB(vin.robeVin, vin.region, vin.arome);
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

  const retriveWineToDB = async (robe, regionVin, aromeVin) => {
    setLoading(true);

    let url_query = `partenaireId=${partenaireId}${
      robeVin ? "&robeVin=" + robeVin : "&robeVin=" + robe
    }${region ? "&region=" + region : "&region=" + regionVin}${
      arome ? "&arome=" + arome : "&arome=" + aromeVin
    }${minPrice ? "&minPrice=" + minPrice : ""}${
      maxPrice ? "&maxPrice=" + maxPrice : ""
    }
    `;

    console.log("url_query ", url_query);
    await axios
      .get(`${apiURL}/vin/partenaire/suggest/?${url_query}`)
      .then((response) => {
        setLoading(false);

        analyzeDataInGpt(response?.data.DATA);
      })
      .catch((err) => {
        // setLoading(false);
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

  const analyzeDataInGpt = async (dataToAnalyse) => {
    setLoading(true);

    // const prompt = `voici des données en JSON
    // "

    // ${JSON.stringify(dataToAnalyse)}

    // "
    // Agis comme un un caviste professionnel pour analyser ces données de manière optimale et éfficace et trouver en premier une meilleure recommandation générale qui irra parfaitement avec ${nomPlat}, puis en second paragraphe en dessous un choix de 3 bouteilles différentes de 3 gammes de prix différentes à savoir 0 à 10 euros, 10 à 25 euros et 25 euros  et plus (Ne prends pas des données qui ne sont pas dans les données que vous analysez et triez le prix du vin par ordre croissante ). Répondez de manière concise, simple et créative et agis comme vous êtes un caviste professionnel qui suggère le vin à un client avec une technique de vente persuasif pas plus de 300 mots (ajoutez des interlignes) et mentionnez tous les caractéristiques du vin et le prix à la fin de votre réponse. Utilisez des emojis si possible et mettez une phrase sympa de WinePal qui remercie l'utilisateur de son utilisation et l'invite à passer un bon moment avec cet accord au final. (NB : N'ajouter aucune phrase comme voici la réponse,ni des remerciements (comme Merci d'utiliser WinePal) ni d'autres en tête de réponse, Débuter avec Pour accompagner ce ${nomPlat})`;

    // console.log("prompt ", prompt);

    // const prompt = `

    // Tu es un sommelier et tu as les vins de la base de donnée suivante à disposition " ${JSON.stringify(
    //   dataToAnalyse
    // )} ".
    // Avec tes connaissances et les informations de la base de données , génère une recommandation générale qui s’accordera parfaitement avec ${nomPlat}. Ensuite, dans un second paragraphe, donne un choix de trois bouteilles avec une bouteille entre 2,5€ et 10€, une entre 10,01€ et 25€ et une dernière à partir de 25,01€. Réponds de manière concise, avec des mots simples et agis comme un professionnel qui a l’habitude de suggérer des accords mets et vins. Tu ne dois pas excéder les 300 mots. Entre chaque paragraphe ajoute des interlignes pour faciliter la lisibilité. N’oublies pas de mentionner le prix du vin et ses caractéristiques. Si possible, utilise quelques emojis et ajoute une phrase sympathique en conclusion avec pour thème « Winepal vous remercie et vous souhaite de passer un bon moment.

    // `;

    const prompt = `

    Tu es un sommelier et tu as les vins de la base de donnée suivante " ${JSON.stringify(
      dataToAnalyse
    )} " et uniquement les vins de la base de donnée à disposition. Avec tes connaissances et les informations de la base de donnée, génère une recommandation générale, sans citer un vin, qui s’accordera parfaitement avec ${nomPlat}. Ensuite, dans un second paragraphe, donne un choix de trois bouteilles avec une bouteille inférieure à 10€, une entre 10€ et 25€ et une dernière à partir de 25€. Réponds de manière concise, avec des mots simples et agis comme un professionnel qui a l’habitude de suggérer des accords mets et vins. Tu ne dois pas excéder les 300 mots. 
    Entre chaque paragraphe ajoute des interlignes pour faciliter la lisibilité. N’oublies pas de mentionner le prix du vin et ses caractéristiques. Si possible, utilise quelques emojis et ajoute une phrase sympathique au sujet de WinePal qui remercie l’utilisateur et lui souhaite de passer un bon moment avec la suggestion. (NB : N'ajouter aucune phrase comme voici la réponse,ni des remerciements (comme Merci d'utiliser WinePal) ni d'autres en tête de réponse, Débuter avec Pour accompagner ce ${nomPlat})
    `;

    console.log("prompt ", prompt);

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

        const textFormated = formatText(response?.data.DATA);
        setUserResponse(textFormated.slice(8));
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
