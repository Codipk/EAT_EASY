// voteSlice.js
import { createSlice } from "@reduxjs/toolkit";

const voteSlice = createSlice({
  name: "vote",
  initialState: {
    // Your initial state for votes
  },
  reducers: {
    upvote: (state, action) => {
      // Update state for upvoting
    },
    downvote: (state, action) => {
      // Update state for downvoting
    },
  },
});

export const { upvote, downvote } = voteSlice.actions;
export default voteSlice.reducer;
