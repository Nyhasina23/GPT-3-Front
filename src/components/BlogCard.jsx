import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button, Grid } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { fileServerAPI } from "../services/apiUrl";
import "styles/blog.css";

export default function BlogCard({ title, content, image }) {
  return (
    <Card
      sx={{ maxWidth: 345, minHeight: 350, maxHeight: 350, overflow: "hidden" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${fileServerAPI}/public/${image}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <ReactMarkdown children={content} className="text-content" />
          {/* <Typography variant="body2" color="text.secondary">
            {content}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" sx={{ color: "#DE0941" }}>
          EN SAVOIR PLUS
        </Button>
      </CardActions>
    </Card>
  );
}
