import { configureStore } from "@reduxjs/toolkit";
import userReducer from 'features/user.slice'
import snackBarReducer from 'features/snackbar.slice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux'

const persistConfig = {
    key: 'user',
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    snackbar: snackBarReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({

    reducer: persistedReducer,
    middleware: [thunk]

})

export const persistor = persistStore(store)