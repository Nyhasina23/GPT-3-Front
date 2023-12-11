/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import "styles/partenaire.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { apiURL } from "services/apiUrl";
import { useDispatch, useSelector } from "react-redux";
import { showNavbar } from "features/snackbar.slice";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const LinkAccountPartenaire = () => {
  const token = useSelector((state) => state.user.token);

  const [partenaires, setPartenaires] = useState([{}]);
  const [accounts, setAccounts] = useState([{}]);
  const [partenaireData, setPartenaireId] = useState("");
  const [accountData, setAccountId] = useState("");

  const dispatch = useDispatch();

  const getPartenaires = async () => {
    await axios({
      method: "GET",
      url: `${apiURL}/partenaires`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setPartenaires(response?.data.DATA);
      })
      .catch((error) => {
        dispatch(
          showNavbar({
            message: error.response.data.MESSAGE,
            type: "FAIL",
            open: true,
          })
        );
      });
  };

  const getProAccount = async () => {
    await axios({
      method: "GET",
      url: `${apiURL}/account/pro`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setAccounts(response?.data.DATA);
      })
      .catch((error) => {
        dispatch(
          showNavbar({
            message: error.response.data.MESSAGE,
            type: "FAIL",
            open: true,
          })
        );
      });
  };

  const linkAccountToPartenaire = async () => {
    if (
      confirm(
        `Vous voulez vraiment lié ${accountData.split(",")[1]} avec ${
          partenaireData.split(",")[1]
        }`
      )
    ) {
      await axios({
        method: "PUT",
        url: `${apiURL}/partenaire/account-link`,
        headers: {
          Authorization: token,
        },
        data: {
          accountProId: accountData.split(",")[0],
          partenaireId: partenaireData.split(",")[0],
        },
      })
        .then(() => {
          dispatch(
            showNavbar({
              message: "Compte pro lié ",
              type: "SUCCESS",
              open: true,
            })
          );
        })
        .catch((error) => {
          dispatch(
            showNavbar({
              message: error.response.data.MESSAGE,
              type: "FAIL",
              open: true,
            })
          );
        });
    }
  };

  useEffect(() => {
    getPartenaires();
  }, []);
  useEffect(() => {
    getProAccount();
  }, []);

  return (
    <div>
      <Grid
        item
        md={12}
        width="100%"
        className="custom-height"
        mt={4}
        padding={4}
        mb={8}
      >
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography variant="h5">Liaison Partenaire - Compte Pro</Typography>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel htmlFor="grouped-native-select">Partenaires</InputLabel>
            <Select
              native
              defaultValue=""
              id="grouped-native-select"
              label="Grouping"
              onChange={(e) => setPartenaireId(e.target.value)}
            >
              <option aria-label="None" value="" />

              {partenaires?.map((partenaire) => (
                <option value={[partenaire?._id, partenaire?.name]}>
                  {partenaire?.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel htmlFor="grouped-native-select">Compte Pro</InputLabel>
            <Select
              native
              defaultValue=""
              id="grouped-native-select"
              label="Grouping"
              onChange={(e) => setAccountId(e.target.value)}
            >
              <option aria-label="None" value="" />

              {accounts?.map((account) => (
                <option value={[account?._id, account?.username]}>
                  {account?.username}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={linkAccountToPartenaire}
          >
            Sauvegarder
          </Button>
        </Stack>
      </Grid>
    </div>
  );
};

export default LinkAccountPartenaire;
