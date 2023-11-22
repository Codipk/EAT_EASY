import { createSlice } from "@reduxjs/toolkit";
import { fetchMessMenu } from "../services/operations/MessMenuAPI";
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    messMenu: [],
    error: null,
    editMessMenu: false,
  },
  reducers: {
    setMessMenu(state, action) {
      state.messMenu = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setEditMessMenu(state, action) {
      state.editMessMenu = action.payload;
    },
    // setNutritionDetails(state,action){
    //   state.nutrio
    // }
  },
});

export const { setMessMenu, setError, setEditMessMenu } = menuSlice.actions;
export default menuSlice.reducer;
