import { combineReducers } from "@reduxjs/toolkit";
import hostelReducer from "../slices/hostelSlice";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import complaintReducer from "../slices/complaintSlice";
import menuReducer from "../slices/messMenuSlice";
import expenseReducer from "../slices/expenseSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  complaint: complaintReducer,
  hostel: hostelReducer,
  menu: menuReducer,
  expense: expenseReducer,
});

export default rootReducer;
