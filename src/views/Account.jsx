import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "../styles/account.css";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { NavLink, Outlet } from "react-router-dom";
import WineBarIcon from "@mui/icons-material/WineBar";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AddIcon from "@mui/icons-material/Add";
import DiningIcon from "@mui/icons-material/Dining";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

export default function Account() {
  const token = useSelector((state) => state.user.token);
  const role = jwtDecode(token).role;
  const showMenu = () => {
    let menu = document.querySelector(".box-container");
    menu.classList.toggle("show");
  };
  return (
    <Grid container>
      <Grid item md={2}>
        <Box
          className="box-container"
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            marginTop: ".2rem",
            zIndex: 0,
          }}
        >
          <List component="nav" aria-label="main mailbox folders">
            <NavLink to="/compte/user/info">
              <ListItemButton onClick={showMenu}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profil" />
              </ListItemButton>
            </NavLink>
            <NavLink to="/compte/user/password">
              <ListItemButton onClick={showMenu}>
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary="Mot de passe" />
              </ListItemButton>
            </NavLink>
            {role > 1 && (
              <NavLink to="/compte/blog/add">
                <ListItemButton onClick={showMenu}>
                  <ListItemIcon>
                    <PostAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Blog" />
                </ListItemButton>
              </NavLink>
            )}
            <NavLink to="/compte/user/biblio/wine">
              <ListItemButton onClick={showMenu}>
                <ListItemIcon>
                  <WineBarIcon />
                </ListItemIcon>
                <ListItemText primary="Vins" />
              </ListItemButton>
            </NavLink>
            <NavLink to="/compte/user/biblio/pal">
              <ListItemButton onClick={showMenu}>
                <ListItemIcon>
                  <RestaurantIcon />
                </ListItemIcon>
                <ListItemText primary="Plats" />
              </ListItemButton>
            </NavLink>
            {role > 1 && (
              <NavLink to="/compte/partenaire/add">
                <ListItemButton onClick={showMenu}>
                  <ListItemIcon>
                    <DashboardCustomizeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Partenaires & Departements" />
                </ListItemButton>
              </NavLink>
            )}
            {role > 1 && (
              <NavLink to="/compte/vins/add">
                <ListItemButton onClick={showMenu}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Vins" />
                </ListItemButton>
              </NavLink>
            )}
            {/* {role > 1 && (
              <NavLink to="/compte/plats/add">
                <ListItemButton onClick={showMenu}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Plats" />
                </ListItemButton>
              </NavLink>
            )} */}
            <NavLink to="/compte/user/biblio/accord">
              <ListItemButton onClick={showMenu}>
                <ListItemIcon>
                  <DiningIcon />
                </ListItemIcon>
                <ListItemText primary="Accords" />
              </ListItemButton>
            </NavLink>
          </List>
        </Box>
      </Grid>
      <Grid className="grid-container" item xs={12} sm={9} md={10} padding={2}>
        <Box>
          <Outlet />
        </Box>
      </Grid>
      <WidgetsIcon className="menu" onClick={showMenu} />
    </Grid>
  );
}
