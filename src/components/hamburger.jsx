import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthentication,
  setUserIdentity,
  setToken,
} from "features/user.slice";

export default function Hamburger() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userAuthenticated = useSelector((state) => state.user.isAuthenticate);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function logout() {
    dispatch(setAuthentication(false));
    dispatch(setUserIdentity(""));
    dispatch(setToken(""));
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <svg
          height="32"
          width="32"
          version="1.1"
          id="_x32_"
          viewBox="0 0 512 512"
        >
          <g>
            <path
              fill="#DE0941"
              d="M256,0C114.618,0,0,114.618,0,256c0,141.383,114.618,256,256,256c141.383,0,256-114.617,256-256
		C512,114.618,397.383,0,256,0z M373.641,366.297H138.352v-36.766h235.289V366.297z M373.641,274.383H138.352v-36.758h235.289
		V274.383z M373.641,182.469H138.352v-36.758h235.289V182.469z"
            />
          </g>
        </svg>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <NavLink to="/" className="nav-link-hamburger">
          <MenuItem onClick={handleClose}>Accueil</MenuItem>
        </NavLink>

        <NavLink to="/wine" className="nav-link-hamburger">
          <MenuItem onClick={handleClose}>Vins</MenuItem>
        </NavLink>
        <NavLink to="/pal" className="nav-link-hamburger">
          <MenuItem onClick={handleClose}>Plats</MenuItem>
        </NavLink>
        <NavLink to="/blogs" className="nav-link-hamburger">
          <MenuItem onClick={handleClose}>Blog</MenuItem>
        </NavLink>
        {userAuthenticated && (
          <NavLink to="/compte/user/info" className="nav-link-hamburger">
            <MenuItem onClick={handleClose}>Compte</MenuItem>
          </NavLink>
        )}
        {!userAuthenticated ? (
          <NavLink to="/login" className="nav-link-hamburger">
            <MenuItem onClick={handleClose}>Connexion</MenuItem>
          </NavLink>
        ) : (
          <NavLink to="/" className="nav-link-hamburger" onClick={logout}>
            <MenuItem onClick={handleClose}>Deconnexion</MenuItem>
          </NavLink>
        )}

        <Outlet />
      </Menu>
    </div>
  );
}
