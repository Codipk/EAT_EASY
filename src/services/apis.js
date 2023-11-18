const BASE_URL = "http://localhost:4000/api/v1";
// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  //   RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};
// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteAccount",
  GET_USER_DETAILS_API: BASE_URL + "/profile/getAllUserDetails",
};
//Complaint Related aPI
export const complaintEndpoints = {
  CREATE_COMPLAINT_API: BASE_URL + "/complaint/createComplaint",
  GET_ALL_MY_COMPLAINTS_API: BASE_URL + "/complaint/myComplaints",
  DELETE_COMPLAINT_API: BASE_URL + "/complaint/deleteComplaint",
  GET_ALL_RESOLVED_COMPLAINTS_API:
    BASE_URL + "/complaint/getResolvedComplaints",
  GET_ALL_UNRESOLVED_COMPLAINTS_API:
    BASE_URL + "/complaint/getUnresolvedComplaints",
  GET_ALL_COMPLAINTS_API: BASE_URL + "/complaint/getAllComplaints",
  DISLIKE_COMPLAINT_API: BASE_URL + "/complaint/updateDownvote",
  LIKE_COMPLAINT_API: BASE_URL + "/complaint/updateUpvote",
};
// mess menu related api
export const menuEndpoints = {
  GET_MESS_MENU_API: BASE_URL + "/menu/viewMenu",
  EDIT_MESS_MENU_API: BASE_URL + "/menu/editMenu",
};

// expense related apis
export const expenseEndpoints = {
  GET_All_EXPENSES_API: BASE_URL + "/expense/getAllDetailsOfExpenseHostelWise",
  DELETE_EXPENSE_API: BASE_URL + "/expense/deleteExpense",
  ADD_EXPENSE_API: BASE_URL + "/expense/addDailyExpense",
  TOTAL_EXPENSE_API: BASE_URL + "/expense/getTotalExpense",
};
