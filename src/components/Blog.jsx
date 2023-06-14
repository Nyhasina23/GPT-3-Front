import { Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BlogCard from "./BlogCard";
import BlogMonth from "./BlogMonth";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiURL } from "../services/apiUrl";

export default function Blog() {
  const [allBlog, setAllBlog] = useState();
  const token = useSelector((state) => state.user.token);
  const getAllBlog = async () => {
    await axios({
      method: "GET",
      url: `${apiURL}/blog/all`,
      headers: {
        authorization: token,
      },
    })
      .then((response) => {
        console.log("response ", response);

        setAllBlog(response.data?.DATA);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllBlog();
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={8}>
        Blog et accord du mois
      </Typography>
      <Grid container columns={{ md: 12 }}>
        <Grid item md={6}>
          {" "}
          <BlogMonth />
        </Grid>

        <Grid item md={6}>
          {" "}
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {allBlog?.map((blog) => {
                return (
                  <Grid item xs={6}>
                    <BlogCard
                      title={blog?.title}
                      content={blog?.content}
                      image={blog?.image}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
