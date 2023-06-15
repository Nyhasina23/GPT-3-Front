import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea, Grid } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { apiURL, fileServerAPI } from "../services/apiUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "styles/blogContent.css";

export default function BlogDetail() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const token = useSelector((state) => state.user.token);

  const { id } = useParams();

  const getBlogDetail = async () => {
    await axios({
      method: "GET",
      url: `${apiURL}/blog/one/${id}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setTitle(response.data.DATA.title);
        setContent(response.data.DATA.content);
        setImage(response.data.DATA.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBlogDetail();
  }, []);

  return (
    <Card
      sx={{
        width: "100vw !important",
        height: "100% !important",
        width: "60%",
        margin: "2rem auto",
      }}
      className="blog-card"
    >
      <CardActionArea
        sx={{
          width: "100% !important",
          height: "100% !important",
        }}
      >
        <CardMedia
          component="img"
          height="500"
          image={`${fileServerAPI}/public/${image}`}
          alt="green iguana"
        />
        <CardContent
          sx={{
            width: "100% !important",
            height: "100% !important",
          }}
        >
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            className="title"
          >
            {title}
          </Typography>
          <ReactMarkdown children={content} className="blog-content"/>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
