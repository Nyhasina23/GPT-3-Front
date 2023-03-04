import React from "react";
import "styles/vincard.css";
import { fileServerAPI } from "services/apiUrl";
import KeepMountedModal from "common/Modal";
export default function VinCard({
  title,
  image,
  millesime,
  region,
  cuve,
  appelation,
  cru,
  aromeParfum,
  assemblage,
  recom
}) {
  return (
    <div className="main-vin-card">
      <img src={`${fileServerAPI}/public/${image}`} alt="vinImg" />
      <div className="vin-info">
        <h1>{title}</h1>
        {/* <div className="body-container">
          <p className="bodyCard"> {cuve} - </p>
          <p className="bodyCard"> {millesime} - </p>
          <p className="bodyCard"> {region} - </p>
          <p className="bodyCard"> {appelation} - </p>
          <p className="bodyCard"> {cru} - </p>
          <p className="bodyCard"> {aromeParfum} - </p>
          <p className="bodyCard"> {assemblage} </p>
        </div> */}
        <KeepMountedModal
          variant="contained"
          className="primary white"
          title={title}
          image={image}
          millesime={millesime}
          region={region}
          cuve={cuve}
          appelation={appelation}
          cru={cru}
          aromeParfum={aromeParfum}
          assemblage={assemblage}
          recom={recom}
        />
      </div>
    </div>
  );
}
