import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Hamburger() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <MenuItem onClick={handleClose}>Accueil</MenuItem>
        <MenuItem onClick={handleClose}>Connexion</MenuItem>
        <MenuItem onClick={handleClose}>Vins</MenuItem>
        <MenuItem onClick={handleClose}>Plats</MenuItem>
      </Menu>
    </div>
  );
}
