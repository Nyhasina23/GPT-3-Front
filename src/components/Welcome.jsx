import React from "react";
import { Button, Typography } from "@mui/material";
import "styles/button.css";
import "styles/welcome.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Welcome() {
  const navigate = useNavigate();

  const isAuthenticate = useSelector((state) => state.user.isAuthenticate);

  return (
    <div className="main-welcome">
      <Typography variant="h4" fontWeight="bold">
        Bienvenue sur WinePal
      </Typography>
      <p>
        {" "}
        Vous êtes-vous déjà retrouvé dans la situation où vous ne savez pas quel
        vin choisir pour accompagner votre plat préféré ? Ou peut-être avez-vous
        acheté une bouteille de vin qui n'était pas tout à fait à votre goût ?
        Eh bien, grâce aux avancées de l'intelligence artificielle, il est
        désormais possible de trouver le parfait accord-mets vins en un rien de
        temps.{" "}
      </p>
      {!isAuthenticate && (
        <Button
          variant="contained"
          className="primary white welcome-button"
          onClick={() => navigate("/register")}
        >
          CREER VOTRE COMPTE
        </Button>
      )}
    </div>
  );
}
