const BASE_URL = process.env.REACT_APP_BASE_URL;
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
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};
//Complaint Related aPI
export const complaintEndpoints = {
  CREATE_COMPLAINT_API: BASE_URL + "/complaint/createComplaint",
  GET_ALL_MY_COMPLAINTS_API: BASE_URL + "/complaint/myComplaints",
  DELETE_COMPLAINT_API: BASE_URL + "/complaint/deleteComplaints",
  GET_ALL_RESOLVED_COMPLAINTS_API:
    BASE_URL + "/complaint/getResolvedComplaints",
  GET_ALL_UNRESOLVED_COMPLAINTS_API:
    BASE_URL + "/complaint/getUnresolvedComplaints",
  GET_ALL_COMPLAINTS_API: BASE_URL + "/complaint/getAllComplaints",
};
