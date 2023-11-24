// UserDetailsComponent.js
import { toast } from "react-hot-toast";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../../../../utils/constants";
import {
  BlockUser,
  markFeeStatusTrue,
  markFeeStatusFalse,
  UnBlockUser,
} from "../../../../../services/operations/SettingsAPI";
import {
  removeFromMessCommittee,
  addToMessCommittee,
} from "../../../../../services/operations/messcommitteeAPI";
const UserDetailsComponent = ({ userDetails }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [isBlocked, setIsBlocked] = useState(userDetails?.isBlocked || false);
  const userId = userDetails._id;
  const [committeeMem, setCommitteeMem] = useState(null);
  const [isMessFeePaid, setIsMessFeePaid] = useState(
    userDetails?.additionalDetails?.isMessFeePaid || false
  );

  const handleBlockToggle = async () => {
    if (!isBlocked) {
      try {
        // Replace the URL with your actual API endpoint for updating block status

        const response = await BlockUser(token, userId);

        if (response) {
          if (!isBlocked) {
            toast.success(response?.message);
          }
          console.log("response in block toggle", response);
          setIsBlocked(!isBlocked);
        } else {
          // Handle errors, e.g., show a message to the user
          console.error("Failed to update block status:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating block status:", error.message);
      }
    } else {
      try {
        // Replace the URL with your actual API endpoint for updating block status

        const response = await UnBlockUser(token, userId);

        if (response) {
          if (!isBlocked) {
            toast.success(response?.message);
          }
          // } else {
          //   toast.success("Successfully Blocked the user");
          // }
          console.log("response in unblock toggle", response);
          setIsBlocked(!isBlocked);
        } else {
          // Handle errors, e.g., show a message to the user
          console.error("Failed to update block status:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating block status:", error.message);
      }
    }
  };
  const handleMessFeeToggle = async () => {
    if (!isMessFeePaid) {
      try {
        const response = await markFeeStatusTrue(token, userId);
        console.log("response in mess try fee toggle", response);
        if (response) {
          setIsMessFeePaid(!isMessFeePaid);
          toast.success(
            isMessFeePaid
              ? "Successfully marked mess fee as unpaid"
              : "Successfully marked mess fee as paid"
          );
        } else {
          console.error(
            "Failed to update mess fee status:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error updating mess fee status:", error.message);
      }
    } else {
      try {
        const response = await markFeeStatusFalse(token, userId);
        console.log("response in mess else fee toggle", response);
        if (response) {
          toast.success(response.message);
        } else {
          console.error(
            "Failed to update mess fee status:",
            response.statusText
          );
        }
        setIsMessFeePaid(!isMessFeePaid);
      } catch (error) {
        console.error("Error updating mess fee status:", error.message);
      }
    }
  };

  const handleAddToMessCommittee = async (e) => {
    try {
      const response = await addToMessCommittee(userId, token);

      if (response) {
        console.log("response", response);
        setCommitteeMem(true); // Update the committee membership status
        // toast.success(response?.message);
      } else {
        console.error(
          "Failed to add user to mess committee:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error adding user to mess committee:", error.message);
    }
  };
  const handleRemoveFromMessCommittee = async () => {
    try {
      const response = await removeFromMessCommittee(userId, token);

      if (response) {
        console.log("response", response);
        setCommitteeMem(false);
        // toast.success(response.message);
      } else {
        console.error(
          "Failed to remove user from mess committee:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error removing user from mess committee:", error.message);
    }
  };
  console.log("userdetails", userDetails);

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
          {user.accountType === ACCOUNT_TYPE.ACCOUNTANT && (
            <>
              <label>Mess Fee Status:</label>
              <input
                type="text"
                className="form-style"
                value={isMessFeePaid ? "Paid" : "Not Paid"}
                readOnly
              />
              <button type="button" onClick={handleMessFeeToggle}>
                {isMessFeePaid ? "Mark as Unpaid" : "Mark as Paid"}
              </button>
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.WARDEN && (
            <>
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
              {!committeeMem ? (
                <button type="button" onClick={handleAddToMessCommittee}>
                  Add to Mess Committee
                </button>
              ) : (
                <button type="button" onClick={handleRemoveFromMessCommittee}>
                  {" "}
                  Remove From Mess Committee
                </button>
              )}
            </>
          )}

          {/* Add more fields as needed */}
        </div>
        {/* You can also add buttons, submit handlers, etc. */}
      </form>
    </div>
  );
};

export default UserDetailsComponent;
