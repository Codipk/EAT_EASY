// import React, { useState, useSelector, useDispatch } from "react";
import { createSlice } from "@reduxjs/toolkit";

const complaintSlice = createSlice({
  name: "complaint",
  initialState: {
    complaint: null,
    resolvedComplaints: [],
    unresolvedComplaints: [],
    title: "",
    body: "",
    complaintImage: null,
    error: null,
    mostvoted: [],
    recent: [],
  },
  reducers: {
    setComplaint(state, action) {
      state.complaint = action.payload;
    },
    setMostVotedComplaints(state, action) {
      state.mostVoted = action.payload;
    },

    setMostRecentComplaints(state, action) {
      state.mostRecent = action.payload;
    },
    setComplaints(state, action) {
      state.complaint = action.payload;
      console.log(
        "state.complaint",
        state.complaint,
        "action.payload",
        action.payload
      );
      state.resolvedComplaints = action.payload.filter(
        (complaint) => complaint.isResolved
      );
      state.unresolvedComplaints = action.payload.filter(
        (complaint) => !complaint.isResolved
      );
      // state.mostvoted = action.payload.filter(
      //   (complaint) => complaint.isResolved
      // );
      // state.recent = action.payload.filter(
      //   (complaint) => !complaint.isResolved
      // );
    },
    addComplaint(state, action) {
      state.complaint = action.payload;
      state.resolvedComplaints = action.payload.filter(
        (complaint) => complaint.isResolved
      );
      state.unresolvedComplaints = action.payload.filter(
        (complaint) => !complaint.isResolved
      );
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setBody: (state, action) => {
      state.body = action.payload;
    },
    setImage: (state, action) => {
      state.complaintImage = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // editComplaint(state, action) {
    //   state.complaint = action.payload;
    // },
    deleteComplaint(state) {
      // by params
      state.complaint = null;
    },
    upvoteComplaint(state, action) {
      state.complaint = action.payload;
    },
    downvoteComplaint(state, action) {
      state.complaint = action.payload;
    },
    setResolvedComplaints(state, action) {
      state.resolvedComplaints = action.payload;
    },
    setUnresolvedComplaints(state, action) {
      state.unresolvedComplaints = action.payload;
    },
  },
});

export const {
  setComplaint,
  addComplaint,
  editComplaint,
  deleteComplaint,
  setComplaints,
  upvoteComplaint,
  downvoteComplaint,
  setTitle,
  setBody,
  setImage,
  setError,
  setResolvedComplaints,
  setUnresolvedComplaints,
  setMostVotedComplaints,
  setMostRecentComplaints,
} = complaintSlice.actions;

export default complaintSlice.reducer;
