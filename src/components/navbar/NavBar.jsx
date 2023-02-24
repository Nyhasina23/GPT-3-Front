import React from "react";
import { Tabs, Tab } from "@mui/material";
import "./navbar.css";
import winepalLogo from "../../assets/images/winepal_logo.png";
import { styled } from "@mui/material/styles";
import { useState } from "react";
const TabsMui = styled(Tab)({
  "&.Mui-selected": {
    color: "#DE0941",
  },
});

export default function NavBar() {

  let start = parseInt(localStorage.getItem("link-count"))

  const [value, setValue] = useState(start);

  const setLink = () => {
    let link_count = parseInt(localStorage.getItem("link-count"))
    setValue(link_count)
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("link-count", newValue);
    setLink()
  };

  return (
    <div className="main-navbar">
      <div className="logo">
        <img src={winepalLogo} alt="winepalLogo" className="winepal-logo" />
      </div>
      <div className="navlink">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example"
          TabIndicatorProps={{
            style: { background: "#DE0941"},
          }}
        >
          <TabsMui label="Accueil" className="nav-link" />
          <TabsMui label="Connexion" className="nav-link" />
          <TabsMui label="Vins" className="nav-link" />
          <TabsMui label="Plats" className="nav-link" />
        </Tabs>
      </div>
    </div>
  );
}
