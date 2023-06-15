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
  const [accord, setAccord] = useState();
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
        setAllBlog(response.data?.DATA);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAccordMonth = async () => {
    await axios({
      method: "GET",
      url: `${apiURL}/blog/accord`,
      headers: {
        authorization: token,
      },
    })
      .then((response) => {
        setAccord(response.data?.DATA);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAccordMonth();
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
        <Grid
          md={6}
          item
          xs={12}
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {" "}
          {accord?.map((blog) => {
            return (
              <BlogMonth
                id={blog?._id}
                title={blog?.title}
                content={blog?.content}
                image={blog?.image}
              />
            );
          })}
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
                  <Grid
                    item
                    xs={12}
                    mt={2}
                    sm={6}
                    md={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <BlogCard
                      id={blog?._id}
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
