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
import TablePagination from "@mui/material/TablePagination";

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

  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [minPrice, setMinPrice] = React.useState();
  const [maxPrice, setMaxPrice] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const regionChange = (event) => {
    setRegion(event.target.value);
  };
  const handleRobeVinChange = (event) => {
    setRobeVin(event.target.value);
  };
  const handleAromeChange = (event) => {
    setArome(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const generate = async () => {
    setLoading(true);

    let url_query = `partenaireId=${partenaireId}&plat_name=${nomPlat}&robeVin=${
      robeVin ? robeVin : ""
    }&region=${region ? region : ""}&arome=${
      arome ? arome : ""
    }&page=${page}&limit=${rowsPerPage}&minPrice=${
      minPrice ? minPrice : ""
    }&maxPrice=${maxPrice ? maxPrice : ""}`;
    await axios
      .get(`${apiURL}/vin/partenaire/suggest/?${url_query}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setLoading(false);
        console.log("response ", response);
        dispatch(
          showNavbar({
            message: "Liste des accords génerés",
            type: "SUCCESS",
            open: true,
          })
        );

        setUserResponse(response?.data?.DATA?.suggestResponse[0]?.results);
        setCount(response?.data?.DATA?.suggestResponse[0]?.count[0].totalCount);
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
        setUserResponse("");
      });
  };

  const handleNomPlatChange = (event) => {
    setNomPlat(event?.target.value);
  };

  useEffect(() => {
    if (token) {
      getDepartements();
    }
  }, []);

  useEffect(() => {
    if (partenaireId) {
      generate();
    }
  }, [page, rowsPerPage]);

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
          {/* {isAuthenticate && (
            <Button
              variant="outlined"
              className="right-btn"
              onClick={() => {
                navigate("/compte/user/biblio/accord");
              }}
            >
              Vos accords
            </Button>
          )} */}

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
                userResponse?.map((userAccord) => (
                  <div className="bodyResponse body-accord">
                    <b>Domaine :</b> {userAccord?.domaine} <br />
                    <b>Millésime :</b> {userAccord?.millesime} <br />
                    <b>Appelation :</b> {userAccord?.appelation} <br />
                    <b>Nom de la cuvée : </b> {userAccord?.cuve} <br />
                    {userAccord?.robeVin && <b>Robe du vin :</b>}{" "}
                    {userAccord?.robeVin} <br />
                    {userAccord?.region && <b>Région du vin :</b>}{" "}
                    {userAccord?.region} <br />
                    <b>Prix : </b>
                    {userAccord?.price} €
                  </div>
                ))
              ) : (
                <p style={{ color: "#b1b1b1" }}>
                  Prêt pour une aventure gustative ? Tapez votre recherche dans
                  la barre prévue à cet effet et partez à la découverte de notre
                  sélection de vins et de mets raffinés. Bon voyage !
                </p>
              )}
            </div>
          </div>
          <div className="pagination">
            <TablePagination
              component="div"
              count={count}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(GenerateWithPartenaire);
