import React from "react";
import "styles/header.css";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  // const userAuthenticated = useSelector((state) => state.user.isAuthenticate);

  function switchToWine() {
    navigate("/wine");
  }

  return (
    <div className="main-header">
      <h1>
        Trouver votre accord-mets vins parfait grâce à l'Intelligence
        Artificielle
      </h1>
      <p>
        Découvrez l'accord ultime entre mets et vins, grâce à notre technologie
        d'Intelligence Artificielle qui révolutionne l'art de la dégustation !
      </p>
      {/* <div className="header-form">
        <input type="text" placeholder="Rechercher votre accord-mets..." />
        <button onClick={switchToWine}>GO</button>
      </div> */}
    </div>
  );
}
