import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import complaintReducer from "../slices/complaintSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  complaint: complaintReducer,
});

export default rootReducer;
