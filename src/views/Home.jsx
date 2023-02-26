import React from "react";
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
export default function Home() {
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
      <div className="main-vin-icons">
        <div className="vin-card">
          <div className="vins">
            <VinCard />
            <VinCard />
            <VinCard />
            <VinCard />
          </div>
          <div className="all-vins">
            <Button variant="outlined" className="all-vins-btn">
              VOIR TOUS
            </Button>
          </div>
        </div>
        <div className="vin-icons">
          <img src={vin1} alt={vin1} />
          <img src={vin2} alt={vin2} />
          <img src={vin3} alt={vin3} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
