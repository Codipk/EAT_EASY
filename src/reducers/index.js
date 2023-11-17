import { combineReducers } from "@reduxjs/toolkit";
import hostelReducer from "../slices/hostelSlice";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import complaintReducer from "../slices/complaintSlice";
import menuSliceReducer from "../slices/messMenuSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  complaint: complaintReducer,
  hostel: hostelReducer,
  menu: menuSliceReducer,
});

export default rootReducer;
