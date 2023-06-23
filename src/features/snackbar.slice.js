import { createSlice } from "@reduxjs/toolkit";

const SnackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    snackBarContent: {
      message: null,
      bg: "",
      open: false,
    },
  },
  reducers: {
    showNavbar: (state, action) => {
      state.snackBarContent.message = action.payload.message;
      action.payload.type === "SUCCESS"
        ? (state.snackBarContent.bg = "#4caf50")
        : (state.snackBarContent.bg = "#f44336");
      state.snackBarContent.open = action.payload.open;
    },
  },
});

export const { showNavbar } = SnackbarSlice.actions;
export default SnackbarSlice.reducer;
