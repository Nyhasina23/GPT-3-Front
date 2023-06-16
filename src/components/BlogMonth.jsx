import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";
import { fileServerAPI } from "../services/apiUrl";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import "styles/blogMonth.css";

export default function BlogMonth({ id, title, content, image }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: "90%", height: "100%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="500"
          className="card-media"
          image={`${fileServerAPI}/public/${image}`}
          alt="accord du mois"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="title"
          >
            {title}
          </Typography>
          <ReactMarkdown children={content} className="text-content-accord" />
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          size="small"
          sx={{ color: "#DE0941" }}
          onClick={() => {
            navigate(`/blog/${id}`);
          }}
        >
          EN SAVOIR PLUS
        </Button>
        <div>
          <EditIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/blog/edit/${id}`);
            }}
          />
        </div>
      </CardActions>
    </Card>
  );
}
