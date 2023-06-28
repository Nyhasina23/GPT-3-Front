import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Header from "components/Header";
import Card from "components/Card";
import Welcome from "components/Welcome";
import vins from "assets/icons/vins.svg";
import plats from "assets/icons/plats.svg";
import ray from "assets/icons/ray.svg";
import "styles/home.css";
import Footer from "components/Footer";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import Cookies from "js-cookie";
import Blog from "components/Blog";

export default function Home() {
  const [allVin, setallVin] = useState([]);
  const count = 4;
  async function getAllVins() {
    const response = await axios.get(`${apiURL}/recipes/?count=${count}`);

    setallVin(response.data.DATA);
  }

  useEffect(() => {
    const cookieValue = Cookies.get("publicite");

    if (!cookieValue) {
      // Définir le cookie de publicité avec une valeur et une expiration
      Cookies.set("publicite", "valeur-du-cookie", { expires: 30 }); // Exemple : expiration de 30 jours
    }
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
          description={"Générez 3 vins différents à accorder avec votre plat"}
          textButton={"GENEREZ MON VIN"}
          classButton={"secondary"}
          borderColor={"border-secondary"}
        />
        <Card
          image={ray}
          title={"Déjà dans le rayon?"}
          titleColor={"title-primary"}
          descColor={"desc-primary"}
          description={"Générez vos accords via un partenaire"}
          textButton={"GENEREZ ACCORD"}
          classButton={"primary mid"}
          borderColor={"border-primary"}
        />
        <Card
          image={plats}
          title={"PLATS"}
          titleColor={"title-secondary"}
          descColor={"desc-secondary"}
          description={"Générez un plat à accorder avec votre vin"}
          textButton={"GENEREZ MON PLATS"}
          classButton={"secondary plat"}
          borderColor={"border-secondary"}
        />
      </div>
      <Welcome />
      <div className="blog">
        <Blog />
      </div>
      <Footer />
    </div>
  );
}
