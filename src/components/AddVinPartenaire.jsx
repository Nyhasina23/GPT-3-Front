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

export const AddVinPartenaire = () => {
  const [domaine, setDomaine] = useState(null);
  const [millesime, setMillesime] = useState(null);
  const [cuve, setCuve] = useState(null);
  const [appelation, setAppellation] = useState(null);
  const [robeVin, setRobeVin] = useState(null);
  const [acomp, setAcomp] = useState(null);
  const [price, setPrice] = useState(null);
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

  const addVinPartenaire = async () => {
    await axios({
      method: "POST",
      url: `${apiURL}/vin/partenaire/create`,
      headers: {
        Authorization: token,
      },
      data: {
        domaine,
        millesime,
        cuve,
        appelation,
        robeVin,
        acomp,
        partenaireId,
        price,
      },
    })
      .then(() => {
        dispatch(
          showNavbar({
            message: "Vin ajouté au partenaire",
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
        <Typography variant="h5">Ajouter Vin Partenaire</Typography>
        <TextField
          id="outlined-basic"
          label="Domaine*"
          variant="outlined"
          fullWidth
          onChange={(e) => setDomaine(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Millésime*"
          variant="outlined"
          fullWidth
          onChange={(e) => setMillesime(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Appellation*"
          variant="outlined"
          fullWidth
          onChange={(e) => setAppellation(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Nom de la cuvée"
          variant="outlined"
          fullWidth
          onChange={(e) => setCuve(e.target.value)}
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
        <TextField
          id="outlined-basic"
          label="Accompagnement"
          variant="outlined"
          fullWidth
          onChange={(e) => setAcomp(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Prix*"
          variant="outlined"
          fullWidth
          onChange={(e) => setPrice(e.target.value)}
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
        onClick={addVinPartenaire}
      >
        Sauvegarder
      </Button>
    </Box>
  );
};
