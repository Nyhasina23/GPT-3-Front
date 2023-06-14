import { Container, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BlogCard from "./BlogCard";
import BlogMonth from "./BlogMonth";

export default function Blog() {
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
              <Grid item xs={6}>
                <BlogCard />
              </Grid>
              <Grid item xs={6}>
                <BlogCard />
              </Grid>
              <Grid item xs={6}>
                <BlogCard />
              </Grid>
              <Grid item xs={6}>
                <BlogCard />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
