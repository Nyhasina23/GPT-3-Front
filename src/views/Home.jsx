import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Header from "components/Header";
import Card from "components/Card";
import Welcome from "components/Welcome";
import vins from "assets/icons/vins.svg";
import plats from "assets/icons/plats.svg";
import vin1 from "assets/icons/vin1.svg";
import vin2 from "assets/icons/vin2.svg";
import vin3 from "assets/icons/vin3.svg";
import "styles/home.css";
import VinCard from "components/VinCard";
import Footer from "components/Footer";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import { NavLink } from "react-router-dom";

export default function Home() {
  const [allVin, setallVin] = useState([]);
  const count = 4;
  async function getAllVins() {
    const response = await axios.get(`${apiURL}/recipes/?count=${count}`);

    setallVin(response.data.DATA);
  }

  useEffect(() => {
    getAllVins();
  }, []);

  return (
    <div>
      <Header />
      <div className="card">
        <Card
          image={vins}
          title={"VINS"}
          titleColor={"title-secondary"}
          descColor={"desc-secondary"}
          description={
            "Générez 3 différentes types de vin accorder avec vos plats"
          }
          textButton={"GENEREZ MON VIN"}
          classButton={"secondary"}
          borderColor={"border-secondary"}
        />
        <Card
          image={plats}
          title={"PLATS"}
          titleColor={"title-primary"}
          descColor={"desc-primary"}
          description={
            "Générez 3 différentes types de plats accorder avec vos vins"
          }
          textButton={"GENEREZ MON PLATS"}
          classButton={"primary"}
          borderColor={"border-primary"}
        />
      </div>
      <Welcome />
      {/* <div className="main-vin-icons">
        <div className="vin-card">
          <div className="vins">
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
          <div className="all-vins">
            <NavLink to="/all-wines">
              <Button variant="outlined" className="all-vins-btn">
                VOIR TOUS
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="vin-icons">
          <img src={vin1} alt={vin1} />
          <img src={vin2} alt={vin2} />
          <img src={vin3} alt={vin3} />
        </div>
      </div> */}
      <Footer />
    </div>
  );
}
