import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button, Grid } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { fileServerAPI } from "../services/apiUrl";
import EditIcon from "@mui/icons-material/Edit";
import "styles/blog.css";
import { useNavigate } from "react-router-dom";

export default function BlogCard({ id, title, content, image }) {
  const navigate = useNavigate();
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
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="title"
          >
            {title}
          </Typography>
          <ReactMarkdown
            children={content}
            className="text-content"
          />
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button size="small" sx={{ color: "#DE0941" }}>
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
