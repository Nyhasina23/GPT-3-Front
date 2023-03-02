import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name : "user",
    initialState : {
        isAuthenticate : false,
        identity : ''
    } ,
    reducers : {
        setAuthentication: (state , action) => {
            state.isAuthenticate = action.payload
        } ,
        setUserIdentity : (state , action) => {
            state.identity = action.payload
        }
    }
})

export const  {setAuthentication  , setUserIdentity} = userSlice.actions
export default userSlice.reducer;