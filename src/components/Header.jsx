import React from "react";
import "styles/header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function switchToWine() {
    navigate("/wine");
  }

  return (
    <div className="main-header">
      <h1>L’accord parfait, à portée de main !</h1>
      {/* <div className="header-form">
        <input type="text" placeholder="Rechercher votre accord-mets..." />
        <button onClick={switchToWine}>GO</button>
      </div> */}
    </div>
  );
}
