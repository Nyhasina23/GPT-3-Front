import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/user.slice";
import snackBarReducer from "features/snackbar.slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { VinsSlice } from "features/vins.slice";


const persistConfig = {
  key: "user",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  snackbar: snackBarReducer,
  vins: VinsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
