import React, { useState, useEffect } from "react";
import "styles/biblio.css";
import { Typography } from "@mui/material";
import { apiURL } from "../services/apiUrl";
import axios from "axios";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";

export function AccordList() {
  let [accords, setAccords] = useState([{}]);
  const token = useSelector((state) => state.user.token);

  async function getAllPlats() {
    const response = await axios.get(`${apiURL}/accords`, {
      headers: {
        Authorization: token,
      },
    });
    setAccords(response?.data?.DATA);
  }

  useEffect(() => {
    getAllPlats();
  }, []);
  return (
    <div>
      <Typography variant="h5" mt={1}>
        Vos bibliothèques d'accords
      </Typography>
      <div className="biblio-data">
        {accords?.map((accord) => {
          return (
            <div>
              {accord?.partenaireId?.name && (
                <Chip
                  sx={{ marginTop: "1rem" }}
                  label={accord?.partenaireId?.name}
                />
              )}
              <div className="head">
                {accord?.domaine && (
                  <p className="title"> {accord?.domaine} </p>
                )}
                {accord?.appelation && (
                  <p className="title"> {accord?.appelation} </p>
                )}
                {accord?.millesime && (
                  <p className="title"> {accord?.millesime} </p>
                )}
                {accord?.cuve && <p className="title"> {accord?.cuve} </p>}
                {accord?.plat_name && (
                  <p className="title"> {accord?.plat_name} </p>
                )}
                {accord?.region && <p className="title"> {accord?.region} </p>}
                {accord?.arome && <p className="title"> {accord?.arome} </p>}
              </div>
              {accord?.IAResponse && (
                <p
                  className="bodyResponse"
                  key={accord?._id}
                  dangerouslySetInnerHTML={{ __html: accord?.IAResponse }}
                ></p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
