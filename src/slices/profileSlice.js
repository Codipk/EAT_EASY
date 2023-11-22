import { createSlice } from "@reduxjs/toolkit";
import { fetchUserDetails } from "../services/operations/SettingsAPI";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  userDetails: null,
  loading: false,
  error: null,
  searchResult: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setSearchResult(state, value) {
      state.searchResult = value.payload;
    },
    clearSearchResult(state, value) {
      state.searchResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching user details";
      });
  },
});

export const { setUser, setLoading, setSearchResult, clearSearchResult } =
  profileSlice.actions;
export default profileSlice.reducer;
