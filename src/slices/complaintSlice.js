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
  },
  reducers: {
    setComplaint(state, action) {
      state.complaint = action.payload;
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
    UpVote(state, action) {
      state.complaint = action.payload;
    },
    DownUpVote(state, action) {
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
  UpVote,
  DownUpVote,
  setTitle,
  setBody,
  setImage,
  setError,
  setResolvedComplaints,
  setUnresolvedComplaints,
} = complaintSlice.actions;

export default complaintSlice.reducer;
