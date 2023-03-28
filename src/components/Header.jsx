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
      Trouvez vos accords mets & vins parfaits grâce à l'intelligence artificielle
      </h1>
      {/* <div className="header-form">
        <input type="text" placeholder="Rechercher votre accord-mets..." />
        <button onClick={switchToWine}>GO</button>
      </div> */}
    </div>
  );
}
