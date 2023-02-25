import React from "react";
import "styles/header.css";
export default function Header() {
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
        <button>GO</button>
      </div>
    </div>
  );
}
