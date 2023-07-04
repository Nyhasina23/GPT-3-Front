import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "styles/partenaire.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import { useDispatch, useSelector } from "react-redux";
import { showNavbar } from "features/snackbar.slice";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import PartenaireModal from "components/PartenaireModal";
import DepartementModal from "components/DepartementModal";

export const AddPartenaire = () => {
  const token = useSelector((state) => state.user.token);

  const [partenaires, setPartenaires] = useState([{}]);
  const [departements, setDepartements] = useState([{}]);
  const [partenaireName, setPartenaireName] = useState("");
  const [departementName, setDepartementName] = useState("");
  const [partenaireId, setPartenaireId] = useState("");
  const [departementId, setDepartementId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalDep, setShowModalDep] = useState(false);

  const dispatch = useDispatch();

  const getPartenaires = async () => {
    await axios({
      method: "GET",
      url: `${apiURL}/partenaires`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setPartenaires(response?.data.DATA);
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

  const addPartenaires = async () => {
    await axios({
      method: "POST",
      url: `${apiURL}/partenaire/create`,
      headers: {
        Authorization: token,
      },
      data: {
        name: partenaireName,
      },
    })
      .then((response) => {
        setPartenaires([...partenaires, response?.data.DATA]);
        setPartenaireName("");
        getPartenaires();
        dispatch(
          showNavbar({
            message: "Partenaire ajouté",
            type: "SUCCESS",
            open: true,
          })
        );
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

  const addDepartements = async () => {
    await axios({
      method: "POST",
      url: `${apiURL}/departement/create`,
      headers: {
        Authorization: token,
      },
      data: {
        name: departementName,
      },
    })
      .then((response) => {
        setDepartements([...departements, response?.data.DATA]);
        setDepartementName("");
        getDepartements();
        dispatch(
          showNavbar({
            message: "Departement ajouté",
            type: "SUCCESS",
            open: true,
          })
        );
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

  const linkPartenaireToDepartement = async () => {
    await axios({
      method: "PUT",
      url: `${apiURL}/departement/partenaire/add`,
      headers: {
        Authorization: token,
      },
      data: {
        departementId,
        partenaireId,
      },
    })
      .then(() => {
        getDepartements();
        dispatch(
          showNavbar({
            message: "Departement et partenaire lié ",
            type: "SUCCESS",
            open: true,
          })
        );
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
    getPartenaires();
  }, []);

  useEffect(() => {
    getDepartements();
  }, []);

  const openPartenaireDeleteModal = (partenaireId, partenaireName) => {
    setShowModal(true);
    setPartenaireId(partenaireId);
    setPartenaireName(partenaireName);
  };

  const openDepartementDeleteModal = (departementId, departementName) => {
    setShowModalDep(true);
    setDepartementId(departementId);
    setDepartementName(departementName);
  };
  const hidePartenaireModal = () => {
    setShowModal(false);
  };
  const hideDepartementModal = () => {
    setShowModalDep(false);
  };
  const deletePartenaire = async () => {
    await axios({
      method: "DELETE",
      url: `${apiURL}/partenaire/${partenaireId}`,
      headers: {
        Authorization: token,
      },
    })
      .then(() => {
        dispatch(
          showNavbar({
            message: "Partenaire supprimé",
            type: "SUCCESS",
            open: true,
          })
        );
        setShowModal(false);
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

  const deleteDepartement = async () => {
    await axios({
      method: "DELETE",
      url: `${apiURL}/departement/${departementId}`,
      headers: {
        Authorization: token,
      },
    })
      .then(() => {
        dispatch(
          showNavbar({
            message: "Departement supprimé",
            type: "SUCCESS",
            open: true,
          })
        );
        setShowModalDep(false);
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
  return (
    <Container className="partenaire-container">
      <Grid container>
        <Grid item md={6} width="100%" className="custom-height" padding={4}>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h5">Ajouter un partenaire</Typography>
            <TextField
              id="outlined-basic"
              label="Nom Partenaire"
              variant="outlined"
              fullWidth={true}
              value={partenaireName}
              sx={{ marginTop: "1rem" }}
              onChange={(e) => setPartenaireName(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={addPartenaires}
            >
              Ajouter
            </Button>
          </Stack>
        </Grid>

        <Grid item md={6} width="100%" className="custom-height" padding={4}>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h5">Ajouter un département</Typography>
            <TextField
              id="outlined-basic"
              label="Nom Departement"
              variant="outlined"
              fullWidth={true}
              sx={{ marginTop: "1rem" }}
              value={departementName}
              onChange={(e) => {
                setDepartementName(e.target.value);
              }}
            />
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={addDepartements}
            >
              Ajouter
            </Button>
          </Stack>
        </Grid>
        <Grid
          item
          md={6}
          mb={8}
          width="100%"
          className="custom-height"
          padding={4}
        >
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h5">Liste des partenaires</Typography>
            <ListItem component="div" disablePadding className="list">
              {partenaires?.map((partenaire) => (
                <ListItemButton sx={{ width: "100%" }}>
                  <div className="list-between">
                    <ListItemText primary={partenaire?.name} />
                    <DeleteIcon
                      onClick={() =>
                        openPartenaireDeleteModal(
                          partenaire?._id,
                          partenaire?.name
                        )
                      }
                      className="trash"
                    />
                  </div>
                </ListItemButton>
              ))}
            </ListItem>
          </Stack>
        </Grid>

        <Grid
          item
          md={6}
          mb={4}
          width="100%"
          className="custom-height"
          padding={4}
        >
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h5">Liste des départements</Typography>
            <ListItem component="div" disablePadding className="list">
              {departements?.map((departement) => (
                <>
                  <ListItemButton sx={{ width: "100%" }}>
                    <div className="list-between">
                      <ListItemText
                        primary={`Dep - ` + departement.name}
                        className="dep-title"
                      />
                      <DeleteIcon
                        onClick={() =>
                          openDepartementDeleteModal(
                            departement?._id,
                            departement?.name
                          )
                        }
                        className="trash"
                      />
                    </div>
                  </ListItemButton>
                  <ListItem
                    component="div"
                    disablePadding
                    className="list-item"
                  >
                    {departement.PartenaireDepartement?.map((partenaireDep) => (
                      <ListItemButton sx={{ width: "100%" }}>
                        <ListItemText primary={partenaireDep.name} />
                      </ListItemButton>
                    ))}
                  </ListItem>
                </>
              ))}
            </ListItem>
          </Stack>
        </Grid>

        <Grid
          item
          md={12}
          width="100%"
          className="custom-height"
          mt={4}
          padding={4}
          mb={8}
        >
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h5">
              Liaison Partenaire - Département
            </Typography>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel htmlFor="grouped-native-select">
                Partenaires
              </InputLabel>
              <Select
                native
                defaultValue=""
                id="grouped-native-select"
                label="Grouping"
                onChange={(e) => setPartenaireId(e.target.value)}
              >
                <option aria-label="None" value="" />

                {partenaires?.map((partenaire) => (
                  <option value={partenaire?._id}>{partenaire?.name}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel htmlFor="grouped-native-select">
                Départements
              </InputLabel>
              <Select
                native
                defaultValue=""
                id="grouped-native-select"
                label="Grouping"
                onChange={(e) => setDepartementId(e.target.value)}
              >
                <option aria-label="None" value="" />

                {departements?.map((departement) => (
                  <option value={departement?._id}>{departement?.name}</option>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={linkPartenaireToDepartement}
            >
              Sauvegarder
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {showModal && (
        <PartenaireModal
          title={partenaireName}
          open={showModal}
          toggleModal={hidePartenaireModal}
          deletePartenaire={deletePartenaire}
        />
      )}
      {showModalDep && (
        <DepartementModal
          title={departementName}
          open={showModalDep}
          toggleModal={hideDepartementModal}
          deleteDepartement={deleteDepartement}
        />
      )}
    </Container>
  );
};
