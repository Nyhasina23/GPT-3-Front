import React from "react";
import "styles/information.css";
import bouteille_info from "assets/images/info_ bouteille.png";

export default function InformationCard({closeInfoCard}) {
  return (
    <div className="main-info">
      <svg
        onClick={closeInfoCard}
        className="closeIcon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_429_11083)">
          <path
            d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006"
            stroke="#292929"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_429_11083">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <img className="imageIconInfo" src={bouteille_info}></img>
    </div>
  );
}
