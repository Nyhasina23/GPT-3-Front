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
import UserInfo from "components/UserInfo";
import UserPassword from "components/UserPassword";
import WidgetsIcon from '@mui/icons-material/Widgets';

export default function Account() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [userInfo, setUserInfo] = React.useState(true);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    index == 0  ? setUserInfo(true) : setUserInfo(false);
    showMenu()
  };

  const showMenu = () => {
    let menu = document.querySelector('.box-container');
    menu.classList.toggle('show');
  }

  return (
    <Grid container >
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
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText primary="Mot de passe" />
            </ListItemButton>
          </List>
        </Box>
      </Grid>
      <Grid className="grid-container" item xs={12} sm={9} md={3} padding={2}>
        <Box >
          {userInfo && <UserInfo />}
          {!userInfo && <UserPassword />}
        </Box>
      </Grid>
      <WidgetsIcon className="menu" onClick={showMenu} />

    </Grid>
  );
}
