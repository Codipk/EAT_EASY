import { toast } from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";
import { logout } from "./authAPI";
import { setLoading, setHostel } from "../../slices/hostelSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
  GET_USER_DETAILS_API,
  BLOCK_THE_USER,
  UNBLOCK_USER,

  RESETPASSWORD_API,
} = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      // if (!formData.get("profilePicture")) {
      //   throw new Error("Profile picture is required.");
      // }

      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.updatedProfile));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR:", error.message);
      toast.error(error.message || "Could Not Update Display Picture");
    }

    toast.dismiss(toastId);
  };
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // const userImage = response.data.updatedUserDetails.image
      //   ? response.data.updatedUserDetails.image
      //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;
      // dispatch(setUser({ ...response.data.updatedUserDetails ,image:userImage}));
      toast.success(response.data.message);
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
}
export async function changePassword(token, formData) {
  console.log("formdata", formData);
  const toastId = toast.loading("Loading...");
  // const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
  //   Authorization: `Bearer ${token}`,
  // });
  // console.log("CHANGE_PASSWORD_API API RESPONSE............", response);
  try {
    const response = await apiConnector("PUT", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success(response.data.message);
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("DELETE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
}

// getting all userDetails
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (token) => {
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log("fetching user details api", response);
      return response.data.userDetails;
    } catch (error) {
      console.log("fetching user details api", error);

      throw error.response ? error.response.data : error.message;
    }
  }
);
// get reset password
export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      console.log("RESET Password RESPONSE ... ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  };
}

// blocking the user
export const BlockUser = async (token, userId) => {
  let result = null;
  // const toastId = toast.loading("Fetching user details...");
  try {
    // Fetch the user token (replace with your actual implementation)

    // Replace with your actual backend API endpoint

    const response = await apiConnector(
      "POST",
      BLOCK_THE_USER,
      { userId },
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Block User RESPONSE............", response);

    if (response?.data?.success === true) {
      // Dispatch success action and update the Redux state
      // dispatch(setUserDetails(response?.data?.userDetails)); // Replace
      // toast.success(response.data.message);
      return response?.data; // Return the user data
    } else {
      // If the response does not indicate success, throw an error
      throw new Error("Could Not Block the User");
    }
  } catch (error) {
    console.error("USER Blocked API ERROR............", error);
    toast.error(error.message);
    // Dispatch error action and update the Redux state
    // dispatch(setError(error.message)); // Remove this line if you don't have an 'setError' action
    return null; // Return null to indicate an error
  }
};
// unblocking the user
export const UnBlockUser = async (token, userId) => {
  let result = null;
  // const toastId = toast.loading("Fetching user details...");
  try {
    // Fetch the user token (replace with your actual implementation)

    // Replace with your actual backend API endpoint

    const response = await apiConnector(
      "POST",
      UNBLOCK_USER,
      { userId },
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Unblock User RESPONSE............", response);

    if (response?.data?.success === true) {
      // Dispatch success action and update the Redux state
      // dispatch(setUserDetails(response?.data?.userDetails)); // Replace
      toast.success(response.data.message);
      return response?.data; // Return the user data
    } else {
      // If the response does not indicate success, throw an error
      throw new Error("Could Not UnBlock the User");
    }
  } catch (error) {
    console.error("USER UnBlocked API ERROR............", error);
    toast.error(error.message);
    // Dispatch error action and update the Redux state
    // dispatch(setError(error.message)); // Remove this line if you don't have an 'setError' action
    return null; // Return null to indicate an error
  }
};
