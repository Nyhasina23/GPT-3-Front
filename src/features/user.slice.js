import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name : "user",
    initialState : {
        isAuthenticate : false,
        showNavbarSuccess : false,
        identity : ''
    } ,
    reducers : {
        setAuthentication: (state , action) => {
            state.isAuthenticate = action.payload
        } ,
        showNavbar : (state , action)  => {
            state.showNavbarSuccess = action.payload;
        } ,
        setUserIdentity : (state , action) => {
            state.identity = action.payload
        }
    }
})

export const  {setAuthentication , showNavbar , setUserIdentity} = userSlice.actions
export default userSlice.reducer;