import React, { useEffect, useState } from "react";
import "styles/blogList.css";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import BlogCard from "components/BlogCard";
import { useSelector } from "react-redux";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { apiURL } from "../services/apiUrl";
import TablePagination from "@mui/material/TablePagination";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.type,
});

const filterType = [{ type: "ACCORD" }, { type: "BLOG" }];

export default function BlogList() {
  const [allBlog, setAllBlog] = useState();
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [type, setType] = React.useState("BLOG");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const token = useSelector((state) => state.user.token);

  const getAllBlog = async () => {
    await axios({
      method: "GET",
      url: `${apiURL}/blog/all/?page=${page}&limit=${rowsPerPage}`,
      headers: {
        authorization: token,
      },
    })
      .then((response) => {
        setAllBlog(response?.data?.DATA?.allBlog[0].data);
        setCount(response?.data?.DATA?.allBlog[0]?.count[0]?.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAccordMonth = async () => {
    await axios({
      method: "GET",
      url: `${apiURL}/blog/accord/?page=${page}&limit=${rowsPerPage}`,
      headers: {
        authorization: token,
      },
    })
      .then((response) => {
        setAllBlog(response?.data?.DATA?.allAccord[0].data);
        setCount(response?.data?.DATA?.allAccord[0]?.count[0]?.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeType = (value) => {
    if (value === "") value = "BLOG";
    setType(value);
  };

  const handleSearchBlog = async (event) => {
    await axios({
      method: "POST",
      url: `${apiURL}/blog/find`,
      headers: {
        authorization: token,
      },
      data: {
        search: event?.target.value,
      },
    })
      .then((response) => {
        setAllBlog(response?.data?.DATA);
      })
      .catch((err) => {
        setAllBlog("");
      });
  };

  useEffect(() => {
    if (type === "BLOG") {
      getAllBlog();
    } else if (type === "ACCORD") {
      getAccordMonth();
    }
  }, [type, page, rowsPerPage]);
  return (
    <div className="main-blog-list">
      <div className="header">
        <h1>Retrouver tous les articles de notre Blog ici.</h1>
      </div>
      <div className="blog-list">
        <h1>Liste des accords et articles</h1>
        <div className="filter">
          <div className="search">
            <input
              type="text"
              placeholder="Rechercher..."
              onChange={(e) => handleSearchBlog(e)}
            />
            <SearchIcon className="icon-search" />
          </div>
          <Autocomplete
            className="filter-type"
            id="filter-demo"
            options={filterType}
            getOptionLabel={(option) => option.type}
            filterOptions={filterOptions}
            sx={{ width: 300 }}
            onChange={(event, value) => changeType(value?.type)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type de blog"
                sx={{ border: "none" }}
              />
            )}
          />
        </div>
      </div>

      <div className="blog-list-item">
        <Grid item md={6}>
          {" "}
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {allBlog ? (
                allBlog?.map((blog) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      mt={2}
                      sm={6}
                      md={4}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <div className="blog-card">
                        <BlogCard
                          id={blog?._id}
                          title={blog?.title}
                          content={blog?.content}
                          image={blog?.image}
                          className="blog-card-item"
                        />
                      </div>
                    </Grid>
                  );
                })
              ) : (
                <h1 className="not-found">Résulat non trouvé!</h1>
              )}
            </Grid>
          </Box>
        </Grid>
      </div>
      <div className="pagination">
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
