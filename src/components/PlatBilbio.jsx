import React, { useState, useEffect } from "react";
import "styles/biblio.css";
import { Typography } from "@mui/material";
import { apiURL } from "../services/apiUrl";
import axios from "axios";
import { useSelector } from "react-redux";

export default function PlatBilbio() {
  let [allPlats, setallPlats] = useState([]);
  const token = useSelector((state) => state.user.token);

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
  return (
    <div>
      <Typography variant="h5" mt={1}>
        Vos bibliothèques de plats
      </Typography>
      <div className="biblio-data">
        {allPlats.map((item) => {
          return (
            <div>
              <div className="head">
                {<p className="title"> {item.domaine} </p>}
                {<p className="title"> {item.appelation} </p>}
                {<p className="title"> {item.millesime} </p>}
                {<p> {item.cuve} </p>}
              </div>
              <p
                className="bodyResponse"
                key={item._id}
                dangerouslySetInnerHTML={{ __html: item.IAResponse }}
              ></p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
