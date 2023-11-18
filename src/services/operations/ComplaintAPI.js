import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { complaintEndpoints } from "../apis";
import { setComplaint } from "../../slices/complaintSlice";
import { useDispatch } from "react-redux";
const { CREATE_COMPLAINT_API } = complaintEndpoints;
const {
  GET_ALL_MY_COMPLAINTS_API,
  DELETE_COMPLAINT_API,
  GET_ALL_RESOLVED_COMPLAINTS_API,
  GET_ALL_UNRESOLVED_COMPLAINTS_API,
  GET_ALL_COMPLAINTS_API,
  LIKE_COMPLAINT_API,
  DISLIKE_COMPLAINT_API,
} = complaintEndpoints;

// cration of complains
export function ComplaintCreation(data, token) {
  return async (dispatch) => {
    let result = null;
    // const dispatch = useDispatch();
    // Create a Toast notification to indicate that the process is loading
    const toastId = toast.loading("Creating Complaint...");
    console.log("Add Complaint API", data);
    // Try to make a POST request to the CREATE_COMPLAINT_API endpoint with the complaint data as the payload
    try {
      const response = await apiConnector("POST", CREATE_COMPLAINT_API, data, {
        // Set the Content-Type header to multipart/form-data if the complaint data includes files
        "Content-Type": "multipart/form-data",

        // Set the Authorization header to Bearer followed by the authentication token
        Authorization: `Bearer ${token}`,
      });
      const Complaintdata = await response.complaint;
      // Log the response data to the console
      // const ComplaintImage = response.complaint.img
      //   ? response.complaint.img
      //   : `https://api.dicebear.com/5.x/initials/svg?seed=}`;
      // dispatch(
      //   setComplaint({ ...response.complaint.img, img: ComplaintImage })
      // );
      console.log("CREATE COMPLAINT API RESPONSE............", response);

      // If the response data indicates that the operation was not successful, throw an error
      if (!Complaintdata?.success) {
        throw new Error("Could Not Create Complaint");
      }

      // Display a Toast notification indicating that the complaint was created successfully
      toast.success("Complaint Created Successfully");

      // Return the response data
      result = Complaintdata?.data;
    } catch (error) {
      // Log the error to the console
      console.log("CREATE COMPLAINT API ERROR............", error);

      // Display a Toast notification indicating that the complaint could not be created
      toast.error(error.message);
    }
    // Return null
    toast.dismiss(toastId);
    // return result;
    // Dismiss the Toast notification
  };
}

//getting all complaints under specific user

export const fetchAllMyComplaints = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_MY_COMPLAINTS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("ALL MY COMPLAINTS API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch All Complaints");
    }
    result = response?.data?.complaints;
  } catch (error) {
    console.log("ALL MY COMPLAINTS API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// delete a complaint
export const deleteComplaint = async (data, token) => {
  const toastId = toast.loading("Loading...");
  console.log("INSIDE DELETE COMPLAINT API");
  try {
    const response = await apiConnector("DELETE", DELETE_COMPLAINT_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE Complaint API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Complaint");
    }
    toast.success("Complaint Deleted");
  } catch (error) {
    console.log("DELETE Complaint API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

// getting allComplaints from all user
export const fetchResolvedComplaintsAPI = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_RESOLVED_COMPLAINTS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("Getting fetchResolvedComplaintAPI", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch RESOLVED Complaints");
    }

    result = response?.data?.allComplaint;
  } catch (error) {
    console.log("GET_ALL_RESOLVED_COMPLAINTS_API API ERROR............", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};
//getting all unresolved Complaint
export const fetchUnresolvedComplaintsAPI = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_UNRESOLVED_COMPLAINTS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("response in fetching unresolved complaint", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch UNRESOLVED Complaints");
    }
    console.log("Getting unresolvedComplaintAPI", response);

    result = response?.data?.allComplaint;
  } catch (error) {
    console.log(
      "GET_ALL_UNRSOLVED_COMPLAINTS_API API ERROR............",
      error
    );
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

// getting all complaint

export const fetchAllComplaints = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", GET_ALL_COMPLAINTS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("ALL  COMPLAINTS API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch All Complaints");
    }
    result = response?.data?.allComplaint;
  } catch (error) {
    console.log("ALL COMPLAINTS API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const likeComplaint = async (complaintId, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      LIKE_COMPLAINT_API,
      { complaintId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Like Complaint API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Like Complaint");
    }

    toast.success("Complaint Liked");
    success = true;
    result = response?.data;
  } catch (error) {
    success = false;
    console.log("Like Complaint API ERROR............", error);
    toast.error(error.message);
    return success;
  }
  toast.dismiss(toastId);
  return result;
};

export const dislikeComplaint = async (complaintId, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      DISLIKE_COMPLAINT_API,
      { complaintId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Dislike Complaint API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Dislike Complaint");
    }

    toast.success("Complaint Disliked");
    success = true;
    result = response?.data;
  } catch (error) {
    success = false;
    console.log("Dislike Complaint API ERROR............", error);
    toast.error(error.message);
    return success;
  }

  toast.dismiss(toastId);
  return result;
};
