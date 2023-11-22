// UserDetailsComponent.js
import { toast } from "react-hot-toast";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BlockUser } from "../../../../../services/operations/SettingsAPI";
const UserDetailsComponent = ({ userDetails }) => {
  const { token } = useSelector((state) => state.auth);
  const [isBlocked, setIsBlocked] = useState(userDetails?.isBlocked || false);
  const userId = userDetails._id;
  const handleBlockToggle = async () => {
    try {
      // Replace the URL with your actual API endpoint for updating block status

      const response = await BlockUser(token, userId);
      console.log("response in block toggle", response);
      if (response) {
        setIsBlocked(!isBlocked);
        if (isBlocked) {
          toast.success("successfully blocked the user");
        } else {
          toast.success("Successfully Unblocked the user");
        }
      } else {
        // Handle errors, e.g., show a message to the user
        console.error("Failed to update block status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating block status:", error.message);
    }
  };
  return (
    <div>
      <form className="flex max-w-[500px] justify-between">
        <div className="flex flex-col gap-y-5">
          <label>Name:</label>
          <input
            type="text"
            className="form-style"
            value={userDetails?.firstName}
            readOnly
          />

          <label>Contact Number:</label>
          <input
            type="text"
            className="form-style"
            value={userDetails?.additionalDetails?.contactNo}
            readOnly
          />
          <label>Hostel</label>
          <input
            type="text"
            className="form-style"
            value={userDetails?.hostel?.hostelName}
            readOnly
          />
          <label>Email:</label>
          <input
            type="text"
            className="form-style"
            value={userDetails?.email}
            readOnly
          />
          <label>Registration Number:</label>
          <input
            type="text"
            className="form-style"
            value={userDetails?.registrationNumber}
            readOnly
          />
          <label>Mess Fee Paid Or Not:</label>
          <input
            type="text"
            className="form-style"
            value={userDetails?.additionalDetails?.isMessFeePaid}
            readOnly
          />
          <label>Block Status:</label>
          <input
            type="text"
            className="form-style"
            value={isBlocked ? "Blocked" : "Active"}
            readOnly
          />

          <button type="button" onClick={handleBlockToggle}>
            {isBlocked ? "Unblock User" : "Block User"}
          </button>

          {/* Add more fields as needed */}
        </div>
        {/* You can also add buttons, submit handlers, etc. */}
      </form>
    </div>
  );
};

export default UserDetailsComponent;
