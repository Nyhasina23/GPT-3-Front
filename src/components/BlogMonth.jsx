import React from "react";
import bouteille_info from "assets/images/info_ bouteille.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function BlogMonth() {
  return (
    <Card sx={{ maxWidth: "90%", height: "100%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="550"
          image={bouteille_info}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
