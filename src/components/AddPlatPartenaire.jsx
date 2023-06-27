import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import { showNavbar } from "features/snackbar.slice";
import { useDispatch, useSelector } from "react-redux";

export const AddPlatPartenaire = () => {
  const [plat_name, setPlatName] = useState(null);
  const [region, setRegion] = useState(null);
  const [robeVin, setRobeVin] = useState(null);
  const [arome, setArome] = useState(null);
  const [partenaireId, setPartenaireId] = useState(null);
  const [partenaires, setPartenaires] = useState([{}]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

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

  const addPlatPartenaire = async () => {
    await axios({
      method: "POST",
      url: `${apiURL}/plat/partenaire/create`,
      headers: {
        Authorization: token,
      },
      data: {
        plat_name,
        arome,
        region,
        robeVin,
        partenaireId,
      },
    })
      .then(() => {
        dispatch(
          showNavbar({
            message: "Plat ajouté au partenaire",
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

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5">Ajouter Plat Partenaire</Typography>
        <TextField
          id="outlined-basic"
          label="Nom du plat"
          variant="outlined"
          fullWidth
          onChange={(e) => setPlatName(e.target.value)}
        />
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel htmlFor="grouped-native-select">Robe du vin</InputLabel>
          <Select
            native
            defaultValue=""
            id="grouped-native-select"
            label="Grouping"
            onChange={(e) => setRobeVin(e.target.value)}
          >
            <option aria-label="None" value="" />
            <option aria-label="Rouge" value="Rouge">
              Rouge
            </option>
            <option aria-label="Blanc" value="Blanc">
              Blanc
            </option>
            <option aria-label="Rosé" value="Rosé">
              Rosé
            </option>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel htmlFor="grouped-native-select">Région du vin</InputLabel>
          <Select
            native
            defaultValue=""
            id="grouped-native-select"
            label="Grouping"
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value=""></option>
            <option value="Alsace">Alsace</option>
            <option value="Champagne">Champagne</option>
            <option value="Bordeaux">Bordeaux</option>
            <option value="Beaujolais">Beaujolais</option>
            <option value="Jura">Jura</option>
            <option value="Bourgogne">Bourgogne</option>
            <option value="Provence">Provence</option>
            <option value="Corse">Corse</option>
            <option value="Languedoc-Roussillon">Languedoc-Roussillon</option>
            <option value="Vallée du Rhône">Vallée du Rhône</option>
            <option value="Vallée de la Loire">Vallée de la Loire</option>
            <option value="Lorraine">Lorraine</option>
            <option value="Sud-Ouest">Sud-Ouest</option>
            <option value="Savoie-Bugey">Savoie-Bugey</option>
            <option value="Roussillon">Roussillon</option>
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Arôme"
          variant="outlined"
          fullWidth
          onChange={(e) => setArome(e.target.value)}
        />
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel htmlFor="grouped-native-select">Partenaire</InputLabel>
          <Select
            native
            defaultValue=""
            id="grouped-native-select"
            label="Grouping"
            onChange={(e) => setPartenaireId(e.target.value)}
          >
            <option aria-label="None" value="" />
            {partenaires?.map((partenaire) => (
              <option aria-label="None" value={partenaire._id}>
                {partenaire.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Button
        sx={{ marginTop: "1rem" }}
        variant="contained"
        onClick={addPlatPartenaire}
      >
        Sauvegarder
      </Button>
    </Box>
  );
};
