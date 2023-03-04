import React from "react";
import "styles/header.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const userAuthenticated = useSelector((state) => state.user.isAuthenticate);

  function switchToWine() {
    if (userAuthenticated) {
      navigate("/wine");
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="main-header">
      <h1>
        Trouver votre accord-mets vins parfait grâce à l'Intelligence
        Artificielle
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, alias
        cum! Rerum placeat, iesse neque sequi fugiat sapiente dolorem ?
      </p>
      <div className="header-form">
        <input type="text" placeholder="Rechercher votre accord-mets..." />
        <button onClick={switchToWine}>GO</button>
      </div>
    </div>
  );
}
