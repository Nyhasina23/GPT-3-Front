import { createSlice } from "@reduxjs/toolkit";

const SnackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        showNavbarSuccess: false,
    },
    reducers: {
        showNavbar: (state, action) => {
            state.showNavbarSuccess = action.payload;
        },
    }
})

export const {showNavbar} = SnackbarSlice.actions
export default SnackbarSlice.reducer