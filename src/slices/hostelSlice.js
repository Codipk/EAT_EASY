import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: localStorage.getItem("hostel")
    ? JSON.parse(localStorage.getItem("hostel"))
    : null,
  loading: false,
};

const hostelSlice = createSlice({
  name: "hostel",
  initialState: initialState,
  reducers: {
    setHostel(state, value) {
      state.hostel = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setHostel, setLoading, setError } = hostelSlice.actions;
export default hostelSlice.reducer;
