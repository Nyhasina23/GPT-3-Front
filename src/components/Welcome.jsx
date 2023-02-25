import React from "react";
import { Button } from "@mui/material";
import "styles/button.css";
import "styles/welcome.css";

export default function Welcome() {
  return (
    <div className="main-welcome">
      <h1>Bienvenue sur WinePal</h1>
      <p>
        {" "}
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium
        nobis tempora dolores, debitis cum ea! Suscipit quibusdam, eaque itaque
        eius ut cumque saepe magni, voluptas molestias fugiat earum alias
        labore. Fugiat eius neque laboriosam voluptatibus porro? Nulla
        reiciendis consequuntur eos ut. Quia repudiandae inventore assumenda,
        impedit minima, ad accusantium reiciendis similique fugit labore saepe
        id! Inventore nulla maxime quo molestiae? Officiis, hic assumenda.{" "}
      </p>
      <Button variant="contained" className="primary white welcome-button">
        CREER VOTRE COMPTE
      </Button>
    </div>
  );
}
