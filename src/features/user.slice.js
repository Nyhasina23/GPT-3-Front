import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticate: false,
        identity: '',
        token: ''
    },
    reducers: {
        setAuthentication: (state, action) => {
            state.isAuthenticate = action.payload
        },
        setUserIdentity: (state, action) => {
            state.identity = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { setAuthentication, setUserIdentity, setToken } = userSlice.actions
export default userSlice.reducer;