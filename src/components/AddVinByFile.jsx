import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ListItemIcon from "@mui/material/ListItemIcon";
import "styles/uploadCsvFile.css";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import { showNavbar } from "features/snackbar.slice";
import { useDispatch, useSelector } from "react-redux";
import csvToJson from "csvtojson";

export default function AddVinByFile() {
  const [filename, setFilename] = useState(
    "Cliquer pour importer vos fichiers"
  );
  const [file, setFile] = useState();
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
  const handleFileChange = (event) => {
    var extension = event.target.files[0].name
      .substring(event.target.files[0].name.lastIndexOf("."))
      .toUpperCase();
    if (extension == ".CSV") {
      setFilename(event.target.files[0].name);

      const reader = new FileReader();

      reader.onload = async (event) => {
        const csvData = event.target.result;
        const json = await csvToJson().fromString(csvData);

        const jsonString = JSON.stringify(json, null, 2);
        setFile(jsonString);
      };

      reader.readAsText(event.target.files[0]);
    } else {
      alert("Please select a valid csv file.");
    }
  };

  const handleUploadFile = () => {
    if (file) {
      try {
        addVinPartenaire(file);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const addVinPartenaire = async (data) => {
    await axios({
      method: "POST",
      url: `${apiURL}/vin/partenaire/create-file`,
      headers: {
        Authorization: token,
      },
      data: {
        files: data,
        partenaireId,
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
    <div className="main-upload">
      {" "}
      <Typography variant="h5">Ajouter Vin Partenaire via CSV</Typography>
      <label htmlFor="file_upload">
        <div className="uploadFile">
          <ListItemIcon>
            <DriveFolderUploadIcon className="driverFolderIcon" />
          </ListItemIcon>
          <input
            type="file"
            id="file_upload"
            onChange={handleFileChange}
            className="input-file"
          />
          <p>{filename}</p>
        </div>
      </label>
      <FormControl sx={{ mt: 1, mb: 1, width: "100%" }}>
        <InputLabel htmlFor="grouped-native-select">Partenaire*</InputLabel>
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
      <Button variant="contained" onClick={handleUploadFile}>
        Ajouter
      </Button>
    </div>
  );
}
