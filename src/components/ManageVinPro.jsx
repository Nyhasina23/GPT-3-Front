/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import "styles/uploadCsvFile.css";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { showNavbar } from "features/snackbar.slice";
import SearchAppBar from "./SearchBar";
import Box from "@mui/material/Box";
import DropDownFilter from "./dropDownMenuFilter";

const columns = [
  { id: "domaine", label: "Domaine", minWidth: 170 },
  { id: "millesime", label: "Millésime", minWidth: 100 },
  {
    id: "robeVin",
    label: "Robe",
    minWidth: 170,
    align: "right",
  },
  {
    id: "price",
    label: "Prix (€)",
    minWidth: 170,
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
];

export default function ManageVinPro() {
  const token = useSelector((state) => state.user.token);
  if (token) {
    var partenaireId = jwtDecode(token).partenaireId;
  }
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allVinsPro, setAllVinPro] = useState();
  const [count, setCount] = React.useState();
  const [isFilterPrice, setIsFilterPrice] = React.useState(false);
  const [isFilterSearch, setIsFilterSearch] = React.useState(false);
  const [filterData, setFilterData] = React.useState();
  const [filterText, setFilterText] = React.useState();
  const dispatch = useDispatch();

  const getAllProAccountVin = async () => {
    await axios({
      method: "GET",
      url: `${apiURL}/recipe/pro/all/?accountId=${partenaireId}&page=${page}&limit=${rowsPerPage}`,
      headers: {
        authorization: token,
      },
    })
      .then((response) => {
        setAllVinPro(response?.data?.DATA?.vins[0]?.data);
        setCount(response?.data?.DATA?.vins[0]?.count[0]?.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteVin = async (vinId, domaine) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Vous voulez vraiment supprimer ${domaine}?`)) {
      await axios({
        method: "DELETE",
        url: `${apiURL}/vin/${vinId}`,
        headers: {
          authorization: token,
        },
      })
        .then(() => {
          dispatch(
            showNavbar({
              message: "Vin supprimé avec succès",
              type: "SUCCESS",
              open: true,
            })
          );
        })
        .catch((err) => {
          dispatch(
            showNavbar({
              message: err.response.data.MESSAGE,
              type: "FAIL",
              open: true,
            })
          );
        });
    }
  };

  const searchVin = useCallback(
    async (query) => {
      await axios({
        method: "POST",
        url: `${apiURL}/vin/pro/find`,
        data: {
          query,
          page,
          limit: rowsPerPage,
        },
        headers: {
          authorization: token,
        },
      })
        .then((response) => {
          setIsFilterPrice(false);
          setIsFilterSearch(true);
          setAllVinPro(response?.data?.DATA?.vins[0]?.data);
          setCount(response?.data?.DATA?.vins[0]?.count[0]?.totalCount);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [page, rowsPerPage]
  );

  const filterByPrice = useCallback(
    async (filter) => {
      await axios({
        method: "POST",
        url: `${apiURL}/vin/pro/filter`,
        data: {
          filter,
          page,
          limit: rowsPerPage,
        },
        headers: {
          authorization: token,
        },
      })
        .then((response) => {
          setAllVinPro(response?.data?.DATA?.vins[0]?.data);
          setCount(response?.data?.DATA?.vins[0]?.count[0]?.totalCount);
          setIsFilterPrice(true);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [page, rowsPerPage]
  );

  useEffect(() => {
    if (isFilterPrice) {
      filterByPrice(filterData);
    } else if (isFilterSearch) {
      searchVin(filterText);
    } else {
      getAllProAccountVin();
    }
  }, [page, rowsPerPage]);

  return (
    <div className="main-upload">
      <Box
        sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}
      >
        <Typography variant="h5" sx={{ marginRight: "1rem" }}>
          Gérer vos vins
        </Typography>
        <SearchAppBar onChange={(e) => searchVin(e)} />
      </Box>
      <br />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 730 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                    }}
                  >
                    <p className={`filter-flex ${column.id}`}>
                      {(column.label === "Robe" ||
                        column.label === "Prix (€)") && (
                        <DropDownFilter
                          type={column.id}
                          handleChooseRobe={(query) => {
                            searchVin(query);
                            setFilterText(query);
                          }}
                          handleFilterPrice={(filter) => {
                            filterByPrice(filter);
                            setFilterData(filter);
                          }}
                        />
                      )}
                      {column.label}{" "}
                    </p>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allVinsPro
                ? allVinsPro?.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        {columns?.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                              {!value && column.id === "action" && (
                                <Button
                                  sx={{ color: "red" }}
                                  onClick={() =>
                                    deleteVin(row._id, row.domaine)
                                  }
                                >
                                  Supprimer
                                </Button>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
