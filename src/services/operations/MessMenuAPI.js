import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { menuEndpoints } from "../apis";
import { setMessMenu, setNutritionDetails } from "../../slices/messMenuSlice";
import { setError } from "../../slices/complaintSlice";
import { useSelect } from "@material-tailwind/react";
import { useSelector } from "react-redux";
const { GET_MESS_MENU_API, EDIT_MESS_MENU_API, GET_NUTRITION_DETAILS_API } =
  menuEndpoints;
export const fetchMessMenu = async (token, dispatch) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", GET_MESS_MENU_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("MESS MENU API RESPONSE............", response);
    console.log("response.data.suceess", response?.data?.sucess);
    if (response?.data?.sucess === true) {
      // Dispatch success action and update the Redux state
      dispatch(setMessMenu(response?.data?.messMenu));
      console.log("setmenu", setMessMenu);
      toast.success("Mess menu fetched successfully");
      return response?.data?.messMenu; // Return the menu data
    } else {
      // If the response does not indicate success, throw an error
      throw new Error("Could Not Fetch Mess Menu");
    }
  } catch (error) {
    console.log("MESS MENU API ERROR............", error);
    toast.error(error.message);
    // Dispatch error action and update the Redux state
    // dispatch(setError(error.message)); // Remove this line if you don't have an 'setError' action
    return null; // Return null to indicate an error
  } finally {
    // Dismiss the loading toast regardless of success or error
    toast.dismiss(toastId);
  }
};

// edit mess menu api
export const editMessMenuDetails = async (data, menuId, token) => {
  let result = null;

  const toastId = toast.loading("Loading...");
  console.log("data fetching in edit mess ", data, typeof data);
  console.log("data fetching in edit mess ", menuId, typeof menuId);
  console.log("data fetching in edit mess ", token, typeof token);
  try {
    // Make the API call to edit mess menu details
    const response = await apiConnector(
      "PUT",
      EDIT_MESS_MENU_API,
      { data, menuId },
      {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("EDIT MESS MENU API RESPONSE............", response);

    // Check if the API call was successful
    if (!response?.data?.success) {
      throw new Error("Could Not Update Mess Menu Details");
    }

    // Display success toast message
    toast.success("Mess Menu Details Updated Successfully");

    // Extract the updated data from the API response
    result = response?.data?.data;
  } catch (error) {
    // Log and display an error toast message if there's an error
    console.log("EDIT MESS MENU API ERROR............", error);
    toast.error(error.message);
  } finally {
    // Dismiss the loading toast
    toast.dismiss(toastId);
  }

  // Return the result
  return result;
};

// get calorie intake
export const getNutritionDetails = async (token, itemName, itemQuantity) => {
  const toastId = toast.loading("Loading...");
  try {
    console.log("token", token);
    const response = await apiConnector(
      "POST",
      GET_NUTRITION_DETAILS_API,
      { itemName, itemQuantity },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("NUTRITION DETAILS API RESPONSE............", response);
    console.log("response.data.success", response?.data?.success);
    if (response?.data?.success === true) {
      // Dispatch success action and update the Redux state
      // Assuming you have a setNutritionDetails action, replace it with the actual action you're using
      // dispatch(setNutritionDetails(response?.data?.data));
      toast.success("Nutrition details fetched successfully");
      return response?.data; // Return the nutrition data
    } else {
      // If the response does not indicate success, throw an error
      throw new Error("Could Not Fetch Nutrition Details");
    }
  } catch (error) {
    console.log("NUTRITION DETAILS API ERROR............", error);
    toast.error(error.message);
    // Dispatch error action and update the Redux state
    // dispatch(setError(error.message)); // Remove this line if you don't have an 'setError' action
    return null; // Return null to indicate an error
  } finally {
    // Dismiss the loading toast regardless of success or error
    toast.dismiss(toastId);
  }
};
