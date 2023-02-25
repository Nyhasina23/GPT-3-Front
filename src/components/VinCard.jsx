import React from "react";
import "styles/vincard.css";
import vinImg from "assets/images/image1.jpg";
import { Button } from "@mui/material";

export default function VinCard() {
  return (
    <div className="main-vin-card">
      <img src={vinImg} alt="vinImg" />
      <div className="vin-info">
        <h1>Title</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit
          explicabo tenetur vel fuga praesentium deserunt autem ea iure vitae
          sequi dolorem quibusdam ut adipisci, nisi officiis eos recusandae
          porro! Placeat.
        </p>
        <Button variant="contained" className="primary white">
          DETAILS
        </Button>
      </div>
    </div>
  );
}
