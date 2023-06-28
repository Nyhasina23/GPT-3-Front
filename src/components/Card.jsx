import Button from "@mui/material/Button";
import "styles/button.css";
import "styles/card.css";
import { useNavigate } from "react-router-dom";
import React from "react";
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
  const navigate = useNavigate();

  function switchToWinePal(buttonType) {
    if (buttonType === "secondary plat") {
      navigate("/pal");
    } else if (buttonType === "secondary") {
      navigate("/wine");
    } else {
      navigate("/generate");
    }
  }

  return (
    <div className={`main-card ${borderColor}`}>
      <img src={image} alt={title} />
      <h2 className={titleColor}>{title}</h2>
      <p className={descColor}>{description}</p>
      <div onClick={() => switchToWinePal(`${classButton}`)}>
        <Button variant="contained" className={`${classButton} white`}>
          {textButton}
        </Button>
      </div>
    </div>
  );
}
