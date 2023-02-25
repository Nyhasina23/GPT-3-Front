import React from "react";
import Button from "@mui/material/Button";
import "styles/button.css";
import "styles/card.css";

export default function Card({
  image,
  title,
  titleColor,
  descColor,
  description,
  textButton,
  classButton,
  borderColor,
}) {
  return (
    <div className={`main-card ${borderColor}`}>
      <img src={image} alt={title} />
      <h1 className={titleColor}>{title}</h1>
      <p className={descColor}>{description}</p>
      <Button variant="contained" className={`${classButton} white`}>
        {textButton}
      </Button>
    </div>
  );
}
