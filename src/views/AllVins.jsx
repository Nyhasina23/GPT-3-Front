import React, { useState, useEffect } from "react";
import "styles/allvins.css";
import VinCard from "components/VinCard";
import { apiURL } from "services/apiUrl";
import axios from "axios";
import Typography from "@mui/material/Typography";

export default function AllVins() {
  const [allVin, setallVin] = useState([]);
  async function getAllVins() {
    const response = await axios.get(`${apiURL}/recipes/`);

    setallVin(response.data.DATA);
  }

  useEffect(() => {
    getAllVins();
  }, []);

  return (
    <div className="main-vins">
      <Typography
        id="keep-mounted-modal-title"
        variant="h6"
        component="h2"
        className="all-vin-title"
      >
        Liste de tous les vins
      </Typography>
      <div className="all-vin-main">
        {allVin
          ? allVin.map((item) => (
              <VinCard
                title={item.domaine}
                key={item._id}
                image={item.image}
                cuve={item.cuve}
                millesime={item.millesime}
                region={item.region}
                appelation={item.appelation}
                cru={item.cru}
                aromeParfum={item.aromeParfum}
                assemblage={item.assemblage}
                recom={item.recom}
              />
            ))
          : ""}
      </div>
    </div>
  );
}
