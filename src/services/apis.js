const BASE_URL = "http://localhost:4000/api/v1";
// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};
// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteAccount",
  GET_USER_DETAILS_API: BASE_URL + "/profile/getAllUserDetails",
  HANDLE_SEARCH_API: BASE_URL + "/profile/getuserbyregistration",
  BLOCK_THE_USER: BASE_URL + "/profile/blockUser",
  UNBLOCK_USER: BASE_URL + "/profile/unblockuser",
  MARK_FEE_PAID: BASE_URL + "/profile/markfeeaspaid",
  MARK_FEE_PAID_FALSE: BASE_URL + "/profile/markfeeasunpaid",
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
  RESOLVE_COMPLAINT_API: BASE_URL + "/complaint/resolvecomplaint",
  GET_COMPLAINT_MOST_VOTE: BASE_URL + "/complaint/getByMostVotes",
  GET_RECENT_COMPLAINT: BASE_URL + "/complaint/getMostRecentComplaints",
};
// mess menu related api
export const menuEndpoints = {
  GET_MESS_MENU_API: BASE_URL + "/menu/viewMenu",
  GET_NUTRITION_DETAILS_API: BASE_URL + "/menu/getnutrition",
  EDIT_MESS_MENU_API: BASE_URL + "/menu/editMenu",
};

// expense related apis
export const expenseEndpoints = {
  GET_All_EXPENSES_API: BASE_URL + "/expense/getAllDetailsOfExpenseHostelWise",
  DELETE_EXPENSE_API: BASE_URL + "/expense/deleteExpense",
  ADD_EXPENSE_API: BASE_URL + "/expense/addDailyExpense",
  TOTAL_EXPENSE_API: BASE_URL + "/expense/getTotalExpense",
  EDIT_EXPENSE_API: BASE_URL + "/expense/updateDailyExpense",
  EXPENSE_PRODUCT_WISE_AND_TOTAL_API:
    BASE_URL + "/expense/getAllExpenseProductWiseAndTotal",
  EXPENSE_CATEGORY_WISE_AND_TOTAL_API:
    BASE_URL + "/expense/getAllExpenseCategoryWiseAndTotal",
  GET_EXPENSE_BY_ID: BASE_URL + "/expense/getExpense",
};

// mess committee related apis
export const messcommitteeEndpoints = {
  CREATE_MESS_COMMITTEE_API: BASE_URL + "/committee/addtocommittee",
  GET_MESS_COMMITTEE: BASE_URL + "/committee/getcommitteedetails",
  REMOVE_FROM_COMMITEE: BASE_URL + "/committee/removefromcommittee",
};

// ratingEndpoints
export const ratingEndpoints = {
  CREATE_RATING_API: BASE_URL + "/rating/createrating",
  GET_AVG_RATING_API: BASE_URL + "/rating/getavgratingmealwise",
};
