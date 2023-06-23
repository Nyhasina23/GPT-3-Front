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
