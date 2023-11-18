// services/operations/ExpenseAPI.js

import { expenseEndpoints } from "../apis";
import { apiConnector } from "../apiconnector"; // Import your API connector function
import { toast } from "react-hot-toast";
const {
  GET_All_EXPENSES_API,
  TOTAL_EXPENSE_API,
  DELETE_EXPENSE_API,
  ADD_EXPENSE_API,
} = expenseEndpoints;

// API function to fetch expenses based on hostel
export const fetchHostelWiseExpenses = async (token, dispatch) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", GET_All_EXPENSES_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("EXPENSES API RESPONSE............", response);

    if (response?.data?.success === true) {
      // Dispatch success action and update the Redux state
      // dispatch(setExpenses(response?.data?.allExpense)); // Assuming you have a 'setExpenses' action
      toast.success("Expenses fetched successfully");
      return response?.data?.allExpense; // Return the expense data
    } else {
      // If the response does not indicate success, throw an error
      throw new Error("Could Not Fetch Expenses");
    }
  } catch (error) {
    console.log("EXPENSES API ERROR............", error);
    toast.error(error.message);
    // Dispatch error action and update the Redux state
    // dispatch(setError(error.message)); // Remove this line if you don't have an 'setError' action
    return null; // Return null to indicate an error
  } finally {
    // Dismiss the loading toast regardless of success or error
    toast.dismiss(toastId);
  }
};

// expense dlete api

export const deleteExpense = async (expenseId, token) => {
  try {
    // Make the API call to delete the expense
    const response = await apiConnector(
      "DELETE",
      DELETE_EXPENSE_API,
      expenseId,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("DELETE EXPENSE API RESPONSE............", response);

    // Check if the API call was successful
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Expense");
    }

    // Log success message
    console.log("Expense Deleted Successfully");
    toast.success(response.data.success);

    // Return the deleted expense data from the API response
    return response?.data?.deletedExpense;
  } catch (error) {
    // Log and throw an error
    console.log("DELETE EXPENSE API ERROR............", error);
    throw error;
  }
};

// API to create expenses

export function addExpense(data, token) {
  return async (dispatch) => {
    let result = null;

    // Create a Toast notification to indicate that the process is loading
    const toastId = toast.loading("Adding Expense...");

    // Try to make a POST request to the ADD_EXPENSE_API endpoint with the expense data as the payload
    try {
      const response = await apiConnector("POST", ADD_EXPENSE_API, data, {
        // Set the Content-Type header to multipart/form-data if the expense data includes files
        "Content-Type": "multipart/form-data",

        // Set the Authorization header to Bearer followed by the authentication token
        Authorization: `Bearer ${token}`,
      });

      // Log the response data to the console
      console.log("ADD EXPENSE API RESPONSE............", response);

      // If the response data indicates that the operation was not successful, throw an error
      if (!response?.data?.sucess) {
        throw new Error("Could Not Add Expense");
      }

      // Display a Toast notification indicating that the expense was added successfully
      toast.success(response.data.message);

      // Return the response data
      result = response?.data?.expense;
    } catch (error) {
      // Log the error to the console
      console.log("ADD EXPENSE API ERROR............", error);

      // Display a Toast notification indicating that the expense could not be added
      toast.error(error.message);
    } finally {
      // Dismiss the Toast notification
      toast.dismiss(toastId);
    }

    // Return the result
    return result;
  };
}

// get total expense
export const fetchTotalExpense = async (token) => {
  try {
    const response = await apiConnector("GET", TOTAL_EXPENSE_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (response?.data?.success) {
      return response.data.total;
    } else {
      throw new Error("Failed to fetch total expense");
    }
  } catch (error) {
    console.error("Error fetching total expense:", error);
    throw new Error("Failed to fetch total expense");
  }
};
