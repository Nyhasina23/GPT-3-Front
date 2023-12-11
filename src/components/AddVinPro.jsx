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
import MenuItem from "@mui/material/MenuItem";
import jwtDecode from "jwt-decode";

export const AddVinPro = () => {
  const [domaine, setDomaine] = useState(null);
  const [millesime, setMillesime] = useState(null);
  const [cuve, setCuve] = useState(null);
  const [appelation, setAppellation] = useState(null);
  const [robeVin, setRobeVin] = useState(null);
  const [arome, setArome] = useState(null);
  const [price, setPrice] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [region, setRegion] = React.useState("");

  const handleChange = (event) => {
    setRegion(event.target.value);
  };

  if (token) {
    var partenaireId = jwtDecode(token).partenaireId;
  }

  const addVinProAccount = async () => {
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
        region,
        arome,
        partenaireId,
        price,
      },
    })
      .then(() => {
        dispatch(
          showNavbar({
            message: "Vin ajouté",
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

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5">Ajouter Vin</Typography>
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Région du vin</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={region}
            label="Région du vin"
            onChange={handleChange}
          >
            <MenuItem value={"Alsace"}>Alsace</MenuItem>
            <MenuItem value={"Champagne"}>Champagne</MenuItem>
            <MenuItem value={"Bordeaux"}>Bordeaux</MenuItem>
            <MenuItem value={"Beaujolais"}>Beaujolais</MenuItem>
            <MenuItem value={"Jura"}>Jura</MenuItem>
            <MenuItem value={"Bourgogne"}>Bourgogne</MenuItem>
            <MenuItem value={"Provence"}>Provence</MenuItem>
            <MenuItem value={"Corse"}>Corse</MenuItem>
            <MenuItem value={"Languedoc-Roussillon"}>
              Languedoc-Roussillon
            </MenuItem>
            <MenuItem value={"Vallée du Rhône"}>Vallée du Rhône</MenuItem>
            <MenuItem value={"Vallée de la Loire"}>Vallée de la Loire</MenuItem>
            <MenuItem value={"Lorraine"}>Lorraine</MenuItem>
            <MenuItem value={"Sud-Ouest"}>Sud-Ouest</MenuItem>
            <MenuItem value={"Savoie-Bugey"}>Savoie-Bugey</MenuItem>
            <MenuItem value={"Roussillon"}>Roussillon</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Arôme du vin"
          variant="outlined"
          fullWidth
          onChange={(e) => setArome(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Prix*"
          variant="outlined"
          fullWidth
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />
      </Stack>
      <Button
        sx={{ marginTop: "1rem" }}
        variant="contained"
        onClick={addVinProAccount}
      >
        Ajouter
      </Button>
    </Box>
  );
};
