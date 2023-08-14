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
      //Here calling another method to read CSV file into json
      setFilename(event.target.files[0].name);
      setFile(event.target.files[0]);
    } else {
      alert("Please select a valid csv file.");
    }
  };

  const handleUploadFile = () => {
    if (file && partenaireId) {
      try {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (e) {
          var jsonData = [];
          var headers = [];
          var rows = e.target.result.split("\r\n");
          for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].split(",");
            var rowData = {};
            for (var j = 0; j < cells.length; j++) {
              if (i == 0) {
                var headerName = cells[j].trim();
                headers.push(headerName);
              } else {
                var key = headers[j];
                if (key) {
                  rowData[key] = cells[j].trim();
                }
              }
            }
            //skip the first row (header) data
            if (i != 0) {
              jsonData.push(rowData);
            }
          }

          //displaying the json result in string format
          jsonData.pop();
          addVinPartenaire(jsonData);
        };
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
