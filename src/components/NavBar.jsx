import React from "react";
import { Tabs, Tab } from "@mui/material";
import "styles/navbar.css";
import winepalLogo from "assets/images/winepal_logo.png";
import { styled } from "@mui/material/styles";
import Hamburger from "components/hamburger";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setAuthentication,
  setUserIdentity,
  setToken,
} from "features/user.slice";

const TabsMui = styled(Tab)({
  "&.Mui-selected": {
    color: "#DE0941",
  },
  color: "#232323",
});

export default function NavBar() {
  let start = parseInt(localStorage.getItem("link-count"));
  const dispatch = useDispatch();
  const [value, setValue] = useState(start);
  const [isAuth, setIsAuth] = useState(false);

  const setLink = () => {
    let link_count = parseInt(localStorage.getItem("link-count"));
    setValue(link_count);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("link-count", newValue);
    setLink();
  };

  const isAuthenticate = useSelector((state) => state.user.isAuthenticate);

  useEffect(() => {
    isAuthenticate ? setIsAuth(isAuthenticate) : setIsAuth(!isAuthenticate);
  }, []);

  function logout() {
    dispatch(setAuthentication(false));
    dispatch(setUserIdentity(""));
    dispatch(setToken(""));
  }

  return (
    <div className="main-navbar">
      <div className="logo">
        <NavLink to="/">
          <img src={winepalLogo} alt="winepalLogo" className="winepal-logo" />
        </NavLink>
      </div>
      <div className="navlink">
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { background: "transparent" },
          }}
        >
          <NavLink
            exact
            to="/"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <TabsMui label="Accueil" className="nav-link" />
          </NavLink>

          <NavLink
            to="/wine"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <TabsMui label="Vins" className="nav-link" />
          </NavLink>

          <NavLink
            to="/pal"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            <TabsMui label="Plats" className="nav-link" />
          </NavLink>

          {isAuthenticate && (
            <NavLink
              to="/compte/user/info"
              className={({ isActive }) => (isActive ? "link-active" : "link")}
            >
              <TabsMui label="Compte" className="nav-link" />
            </NavLink>
          )}

          {!isAuthenticate ? (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "link-active" : "link")}
            >
              <TabsMui label="Connexion" className="nav-link" />
            </NavLink>
          ) : (
            <NavLink
              onClick={logout}
              to="/"
              className={({ isActive }) => (isActive ? "link-active" : "link")}
            >
              <TabsMui label="Deconnexion" className="nav-link" />
            </NavLink>
          )}

          <Outlet />
        </Tabs>
      </div>
      <div className="hamburger">
        <Hamburger />
      </div>
    </div>
  );
}
