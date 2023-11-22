import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { ratingEndpoints } from "../apis";
const { CREATE_RATING_API, GET_AVG_RATING_API } = ratingEndpoints;

export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE RATING API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating");
    }
    toast.success(response?.data?.message);
    success = true;
  } catch (error) {
    success = false;
    console.log("CREATE RATING API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return success;
};

// get Avg rating
// RatingAPI.js

export const getAverageRating = async (token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("GET", GET_AVG_RATING_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET AVG RATING API RESPONSE................", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Average Rating");
    }

    toast.success(response?.data?.message);

    // Dismiss loading toast
    toast.dismiss(toastId);

    // Return the result data
    return response?.data;
  } catch (error) {
    console.error("Fetching average Rating API Error..........", error);

    // Display an error toast
    toast.error(
      error.response?.data?.message || "Error fetching average rating"
    );

    // Dismiss loading toast in case of an error
    toast.dismiss(toastId);

    // Throw the error to indicate failure
    throw error;
  }
};
