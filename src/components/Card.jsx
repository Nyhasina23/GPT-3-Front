import Button from "@mui/material/Button";
import "styles/button.css";
import "styles/card.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  const userAuthenticated = useSelector((state) => state.user.isAuthenticate);

  function switchToWinePal(buttonType) {
    if (buttonType === "primary" && userAuthenticated) {
      navigate("/pal");
    } else if (buttonType === "secondary" && userAuthenticated) {
      navigate("/wine");
    } else {
      navigate("/login");
    }
  }

  return (
    <div className={`main-card ${borderColor}`}>
      <img src={image} alt={title} />
      <h1 className={titleColor}>{title}</h1>
      <p className={descColor}>{description}</p>
      <div onClick={() => switchToWinePal(`${classButton}`)}>
        <Button variant="contained" className={`${classButton} white`}>
          {textButton}
        </Button>
      </div>
    </div>
  );
}
