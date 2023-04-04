import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "styles/plats.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { showNavbar } from "features/snackbar.slice";
import SnackBar from "common/SnackBar";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import { useNavigate } from "react-router-dom/dist";
import { fileServerAPI } from "services/apiUrl";
import Switch from "@mui/material/Switch";

export default function Plats() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function switchToWine() {
    navigate("/wine");
  }

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [snackBg, setSnackBg] = useState("#4caf50");
  const [errorMessage, setErrorMessage] = useState();
  const [domaine, setDomaine] = useState();
  const [cuve, setCuve] = useState();
  const [millesime, setMillesime] = useState();
  const [region, setRegion] = useState("");
  const [appelation, setAppelation] = useState();
  const [cru, setCru] = useState();
  const [assemblage, setAssemblage] = useState();
  const [aromeParfum, setAromeParfum] = useState();
  const [recom, setRecom] = useState();
  const [photo, setPhoto] = useState();
  const [filename, setFilename] = useState();
  const [plats, setPlats] = useState();
  let [allPlats, setallPlats] = useState([]);
  let [file, setFile] = useState("Photo");
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
  function regionChange(event) {
    setRegion(event.target.value);
  }
  function appelationChange(event) {
    setAppelation(event.target.value);
  }
  function cruChange(event) {
    setCru(event.target.value);
  }
  function assemblageChange(event) {
    setAssemblage(event.target.value);
  }
  function aromeParfumChange(event) {
    setAromeParfum(event.target.value);
  }
  function recomChange(event) {
    setRecom(event.target.value);
  }
  function photoChange(event) {
    setPhoto(event.target.files);
    setFile(event.target.files[0].name);
  }

  const token = useSelector((state) => state.user.token);

  async function generatePlats() {
    // /gpt3/api/
    setLoading(true);

    if (
      domaine == undefined ||
      millesime == undefined ||
      appelation == undefined
    ) {


      console.log('domaine ' , domaine)
      console.log('millesime ' , millesime)
      console.log('appelation ' , appelation)

      setErrorMessage("Verifier tous les champs obligatoire");
      setSnackBg("#f44336");
      dispatch(showNavbar(true));
      setOpen(true);
      setLoading(false);
    } else {
      await axios
        .post(
          `${apiURL}/gpt3/api/`,
          {
            prompt: `Donner moi 3 accord-mets avec ce vin 
        
        ${domaine} ,
        ${cuve} ,
        ${millesime} ,
        ${region} ,
        ${appelation} ,
        ${cru ? cru : ""} ,
        ${assemblage ? assemblage : ""} ,
        ${aromeParfum ? aromeParfum : ""} ,
        ${recom ? recom : ""} ,

        et une phrase à chaque réponse`,
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
          setPlats(response.data.DATA);
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

  // async function savePhotos() {
  //   var formData = new FormData();
  //   if (photo) {
  //     for (const i of Object.keys(photo)) {
  //       formData.append("images", photo[i]);
  //     }
  //   }
  //   await axios({
  //     method: "post",
  //     url: `${fileServerAPI}/upload`,
  //     data: formData,
  //   })
  //     .then((res) => {
  //       setFilename(res.data[0]);
  //     })
  //     .catch(() => {
  //       alert("Une erreur est survenu lors du téléchargement des images");
  //     });
  // }

  async function savePlat() {
    // if(filename != undefined){
    //   await savePhotos();
    // }
    let IAResponse = plats.replace(/(\r\n|\n|\r)/gm, "");

    setSaveLoading(true);

    await axios
      .post(
        `${apiURL}/recipe/create`,
        {
          domaine,
          cuve,
          millesime,
          region,
          appelation,
          cru,
          assemblage,
          aromeParfum,
          recom,
          IAResponse,
          // image: filename,
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

  async function getAllPlats() {
    const response = await axios.get(`${apiURL}/recipe/all`, {
      headers: {
        Authorization: token,
      },
    });

    setallPlats(response.data.DATA);
  }

  useEffect(() => {
    getAllPlats();
  }, []);

  const label = { inputProps: { "aria-label": "advanced search" } };

  function switchToAdvanced() {
    setAdvanced(!advanced);
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
                  className="input-file"
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
                    placeholder="Cru..."
                    onChange={cruChange}
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

                <div className="input-icon">
                  <input
                    type="text"
                    placeholder="Assemblage"
                    onChange={assemblageChange}
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
                <div className="input-icon">
                  <input
                    type="text"
                    placeholder="Arômes et parfums"
                    onChange={aromeParfumChange}
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

                <div className="input-icon">
                  <label htmlFor="input-file" className="input-file labelPhoto">
                    <p>{file}</p>
                  </label>
                  <input
                    type="file"
                    placeholder="Photos"
                    accept="image/*"
                    id="input-file"
                    className="input-hidden"
                    onChange={photoChange}
                  />

                  <svg
                    className="svg-icon-1 image-input"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47"
                    height="47"
                    viewBox="0 0 47 47"
                  >
                    <g
                      id="Groupe_68"
                      data-name="Groupe 68"
                      transform="translate(-0.157)"
                    >
                      <rect
                        id="Rectangle_48"
                        data-name="Rectangle 48"
                        width="47"
                        height="47"
                        transform="translate(0.157)"
                        fill="#f5f5f5"
                        opacity="0"
                      />
                      <g
                        id="Groupe_66"
                        data-name="Groupe 66"
                        transform="translate(3.979 6.779)"
                      >
                        <path
                          id="Tracé_33"
                          data-name="Tracé 33"
                          d="M4.683,2.85A3.737,3.737,0,0,0,.95,6.583V25.249a3.737,3.737,0,0,0,3.733,3.733H28.949a3.737,3.737,0,0,0,3.733-3.733V6.583A3.737,3.737,0,0,0,28.949,2.85Zm31.733,7.466v22.4h-28v3.733h28a3.761,3.761,0,0,0,3.733-3.733v-22.4ZM21.753,14.028,30.01,25.249H3.622l6.54-8.338,4.882,5.877Z"
                          transform="translate(-0.95 -2.85)"
                          fill="#f5f5f5"
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
            Vos accord-mets
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
              Vos réponses sont suggérées ici
            </h3>
            <hr />
            <div className="ia-response-plat">
              <div className="head">
                {domaine ? <p className="title"> {domaine} </p> : ""}
                {cuve ? <p> {cuve} </p> : ""}
              </div>
              {plats ? <p className="bodyResponse">{plats}</p> : ""}
              {allPlats.length > 0 || plats ? (
                allPlats.map((item) => {
                  return (
                    <div>
                      <div className="head">
                        {<p className="title"> {item.domaine} </p>}
                        {<p> {item.cuve} </p>}
                      </div>
                      <p className="bodyResponse" key={item.id}>
                        {item.IAResponse.replace(/(?:\r\n|\r|\n)/g, "<br>")}{" "}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: "#b1b1b1" }}>
                  !!!Oups, il semble que vous n'avez pas encore des reponses
                  suggérées
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
    </div>
  );
}
