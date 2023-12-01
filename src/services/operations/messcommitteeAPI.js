// cration of complains
import toast from "react-hot-toast";
import { messcommitteeEndpoints, settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUserDetails } from "../../slices/profileSlice";
import axios from "axios";
const hello = "IN THE MESS COMMITTE API";
const { CREATE_MESS_COMMITTEE_API, GET_MESS_COMMITTEE, REMOVE_FROM_COMMITEE } =
  messcommitteeEndpoints;
const { HANDLE_SEARCH_API } = settingsEndpoints;
export const addToMessCommittee = async (userId, token) => {
  let result = null;
  // const dispatch = useDispatch();
  // Create a Toast notification to indicate that the process is loading
  const toastId = toast.loading("Creating MESS COMMITTEe...");
  console.log("Add mess committee API", userId);
  // Try to make a POST request to the CREATE_COMPLAINT_API endpoint with the complaint data as the payload
  try {
    const response = await apiConnector(
      "PUT",
      CREATE_MESS_COMMITTEE_API,
      { userId },
      {
        // Set the Content-Type header to multipart/form-data if the complaint data includes files
        "Content-Type": "multipart/form-data",

        // Set the Authorization header to Bearer followed by the authentication token
        Authorization: `Bearer ${token}`,
      }
    );
    const MessCommitteedata = await response.data;
    // Log the response data to the console
    // const ComplaintImage = response.complaint.img
    //   ? response.complaint.img
    //   : `https://api.dicebear.com/5.x/initials/svg?seed=}`;
    // dispatch(
    //   setComplaint({ ...response.complaint.img, img: ComplaintImage })
    // );
    console.log("CREATE MESS COMMITTEE API RESPONSE............", response);

    // If the response data indicates that the operation was not successful, throw an error
    if (!MessCommitteedata?.success) {
      throw new Error("Could Not Mess-committee");
    }

    // Display a Toast notification indicating that the complaint was created successfully
    toast.success(response.data.message);

    // Return the response data
    result = MessCommitteedata;
  } catch (error) {
    // Log the error to the console
    console.log("CREATE MEss committee API ERROR............", error);

    // Display a Toast notification indicating that the complaint could not be created
    toast.error(error.message);
  }
  // Return null
  toast.dismiss(toastId);
  return result;
  // Dismiss the Toast notification
};

// for getting mess commitee
export const getMessCommittee = async (token) => {
  let result = null;

  // Create a Toast notification to indicate that the process is loading
  const toastId = toast.loading("Getting MESS COMMITTEe...");
  console.log("getting mess commitee");
  // Try to make a POST request to the SEARCH_MESS_COMMITTEE_API endpoint with the filter data as the payload
  try {
    const response = await apiConnector("GET", GET_MESS_COMMITTEE, null, {
      "Content-Type": "application/json", // Set the Content-Type header to application/json
      Authorization: `Bearer ${token}`, // Set the Authorization header to Bearer followed by the authentication token
    });

    // Log the response data to the console
    console.log("GET MESS COMMITTEE API RESPONSE............", response);

    // If the response data indicates that the operation was not successful, throw an error
    if (!response?.data?.success) {
      throw new Error("Could Not Search Mess-committee");
    }

    // Display a Toast notification indicating that the search was successful
    toast.success(response.data.message);

    // Return the response data
    result = response.data;
  } catch (error) {
    // Log the error to the console
    console.log("SEARCH MEss committee API ERROR............", error);

    // Display a Toast notification indicating that the search could not be performed
    toast.error(error.message);
  } finally {
    // Dismiss the Toast notification
    toast.dismiss(toastId);
  }

  // Return the result
  return result;
};

// handle search filter api
export const searchUserByRegistrationNumber = async (
  registrationNumber,
  token
) => {
  console.log("regno", registrationNumber, typeof registrationNumber);
  console.log("token", token);
  // console.log("dispatch", dispatch);
  const toastId = toast.loading("Fetching user details...");
  // const response = await apiConnector(
  //   "GET",
  //   HANDLE_SEARCH_API,
  //   { registrationNumber }, // Send registrationNumber in the request body
  //   {
  //     Authorization: `Bearer ${token}`,
  //   }
  // );

  // console.log("USER DETAILS API RESPONSE............", response);
  try {
    console.log("registration number inside try", registrationNumber);
    const response = await apiConnector(
      "POST",
      HANDLE_SEARCH_API,
      { registrationNumber }, // Send registrationNumber in the request body
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("USER DETAILS API RESPONSE............", response);

    if (response?.data?.success === true) {
      // Dispatch success action and update the Redux state
      // dispatch(setUserDetails(response?.data?.userDetails)); // Replace
      toast.success("User details fetched successfully");
      return response?.data; // Return the user data
    } else {
      // If the response does not indicate success, throw an error
      throw new Error("Could Not Fetch User Details");
    }
  } catch (error) {
    console.error("USER DETAILS API ERROR............", error);
    toast.error(error.message);
    // Dispatch error action and update the Redux state
    // dispatch(setError(error.message)); // Remove this line if you don't have an 'setError' action
    return null; // Return null to indicate an error
  } finally {
    // Dismiss the loading toast regardless of success or error
    toast.dismiss(toastId);
  }
};
// remove
export const removeFromMessCommittee = async (userId, token) => {
  let result = null;
  // const dispatch = useDispatch();
  // Create a Toast notification to indicate that the process is loading
  const toastId = toast.loading("Removing MESS COMMITTEe...");
  // console.log("Add mess committee API", data);
  // Try to make a POST request to the CREATE_COMPLAINT_API endpoint with the complaint data as the payload
  try {
    const response = await apiConnector(
      "PUT",
      REMOVE_FROM_COMMITEE,
      // data,
      { userId },
      {
        // Set the Content-Type header to multipart/form-data if the complaint data includes files
        "Content-Type": "multipart/form-data",

        // Set the Authorization header to Bearer followed by the authentication token
        Authorization: `Bearer ${token}`,
      }
    );
    const MessCommitteedata = await response.data;
    // Log the response data to the console
    // const ComplaintImage = response.complaint.img
    //   ? response.complaint.img
    //   : `https://api.dicebear.com/5.x/initials/svg?seed=}`;
    // dispatch(
    //   setComplaint({ ...response.complaint.img, img: ComplaintImage })
    // );
    console.log("Remove MESS COMMITTEE API RESPONSE............", response);

    // If the response data indicates that the operation was not successful, throw an error
    if (!MessCommitteedata?.success) {
      throw new Error("Could Not remove Mess-committee");
    }

    // Display a Toast notification indicating that the complaint was created successfully
    toast.success(response.data.message);

    // Return the response data
    result = MessCommitteedata;
  } catch (error) {
    // Log the error to the console
    console.log("Remove mess  committee API ERROR............", error);

    // Display a Toast notification indicating that the complaint could not be created
    toast.error(error.message);
  }
  // Return null
  toast.dismiss(toastId);
  return result;
  // Dismiss the Toast notification
};
