import { createSlice } from "@reduxjs/toolkit";

export const VinsSlice = createSlice({
  name: "vins",
  initialState: {
    vinsItems: [],
  },

  reducers: {
    setVinsItems: (state, action) => {
      state.vinsItems.push(action.payload);
    },
  },
});

export const { setVinsItems } = VinsSlice.actions;
export default VinsSlice.reducer;
