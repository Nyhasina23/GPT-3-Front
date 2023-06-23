import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
export const AddVinPartenaire = () => {
  return (
    <Box>
      <Stack spacing={2}>
      <Typography variant="h5">Ajouter vin Partenaire</Typography>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          fullWidth
        />
      </Stack>
    </Box>
  );
};
