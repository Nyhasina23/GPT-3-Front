import React, { useState, useEffect } from "react";
import "styles/biblio.css";
import { Typography } from "@mui/material";
import { apiURL } from "../services/apiUrl";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Bilbio() {
  let [allVin, setallVin] = useState([]);
  const token = useSelector((state) => state.user.token);

  async function getAllVins() {
    const response = await axios.get(`${apiURL}/vin/all`, {
      headers: {
        Authorization: token,
      },
    });
    setallVin(response.data.DATA);
  }

  useEffect(() => {
    getAllVins();
  }, []);
  return (
    <div>
      <Typography variant="h5" mt={1}>
        Vos bibliothèques de vins
      </Typography>
      <div className="biblio-data">
        {allVin.map((item) => {
          return (
            <div>
              <div className="head">
                {<p className="title"> {item.plat_name} </p>}
              </div>
              <p
                className="bodyResponse"
                key={item.id}
                dangerouslySetInnerHTML={{ __html: item.IAResponse }}
              ></p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
