import { configureStore } from "@reduxjs/toolkit";
import userReducer from 'features/user.slice'
import snackBarReducer from 'features/snackbar.slice'

export default configureStore({

    reducer: {
        user: userReducer,
        snackbar: snackBarReducer
    }

})