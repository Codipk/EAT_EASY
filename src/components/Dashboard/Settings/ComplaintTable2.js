import { React, useState, useEffect } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllMyComplaints,
  deleteComplaint,
  likeComplaint,
  dislikeComplaint,
  resolveComplaint,
} from "../../../services/operations/ComplaintAPI";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { formattedDate } from "../../../utils/dateFormatter";
import { FaCheck } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiClock } from "react-icons/hi";
import ConfirmationModal from "../../common/ConfirmationModal";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
const ComplaintTable2 = ({ complaints, setComplaint }) => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 30;

  const onUpvote = async (complaintId) => {
    console.log("complaint ID in UP", complaintId);
    try {
      const response = await likeComplaint(complaintId, token);
      console.log("Response", response);
      if (response?.success) {
        // Successfully upvoted
        const updatedComplaint = response?.updatedComplaint;
        console.log("Updated Complaint after upvote:", updatedComplaint);
        setComplaint((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === updatedComplaint._id
              ? updatedComplaint
              : complaint
          )
        );

        // toast.success("Complaint Liked");
      } else {
        console.log("NOT LIKE");
      }
    } catch (error) {
      console.error("Error while liking complaint:", error.message);
    }
  };

  //  ******
  // HANDLE DOWNVOTE *************************************
  const onDownvote = async (complaintId) => {
    console.log("complaint ID in DV", complaintId);
    try {
      const response = await dislikeComplaint(complaintId, token);
      console.log("response", response);
      if (response?.success) {
        console.log("fetching response in downvote", response);
        const updatedComplaint = response?.updatedComplaint;
        if (updatedComplaint == null) {
          console.log("NO Complaint is there");
        } else {
          // dispatch(downvoteComplaint(response?.updatedComplaint));
          setComplaint((prevComplaints) =>
            prevComplaints.map((complaint) =>
              complaint._id === updatedComplaint._id
                ? updatedComplaint
                : complaint
            )
          );
        }
      }
    } catch (error) {
      console.error("Error while liking complaint:", error.message);
    }
  };
  // **************mark as resolved
  const handleResolveClick = async (complaintId) => {
    try {
      // Make an API call to mark the complaint as resolved
      // You need to implement the API endpoint for this operation
      const response = await resolveComplaint(complaintId, token);
      console.log("response ", response);
      if (response?.success) {
        // Successfully marked as resolved
        const updatedComplaint = response?.complaint;
        console.log("Updated Complaint after resolving:", updatedComplaint);

        // Update the local state
        setComplaint((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === updatedComplaint._id
              ? updatedComplaint
              : complaint
          )
        );

        // toast.success("response.");
        console.log("MARKED COMPLAINT AS RESOLVED");
      } else {
        console.log("Failed to mark as resolved");
      }
    } catch (error) {
      console.error("Error while resolving complaint:", error.message);
    }
  };

  const handleComplaintDelete = async (complaintId) => {
    setLoading(true);
    const complaint_Id = complaintId.toString();
    const result = await fetchAllMyComplaints(token);
    console.log("complint id", typeof complaint_Id, complaint_Id);
    await deleteComplaint({ complaintId: complaint_Id }, token);
    console.log("Deleted Complaint", result);
    if (result) {
      console.log("deleting complaint");
      // setComplaints(result);
      // toast.success("Complaint Deleted Succesfully");
    }
    setConfirmationModal(null);
    setLoading(false);
  };
  console.log(complaints, "here is your complinats");
  return (
    <>
      <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-yellow-100 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-orange-50">
              Complaints
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-orange-50">
              Date
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-orange-50">
              UpVote
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-orange-50">
              DownVote
            </Th>
            {/* {(user.accountType === ACCOUNT_TYPE.WARDEN ||
              user.accountType === ACCOUNT_TYPE.ACCOUNTANT) && ( */}
            {/* <> */}
            <Th className="text-left text-sm font-medium uppercase text-slate-200">
              Delete
            </Th>
            {/* </>
            )} */}
          </Tr>
        </Thead>
        <Tbody>
          {complaints?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-yellow-200">
                No Complaint found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            complaints?.map((complaint) => (
              <Tr
                key={complaint._id}
                className="flex gap-x-10 border-b border-richblack-800 text-green-200 px-6 py-8"
              >
                <>
                  <Td className="flex flex-1 gap-x-4">
                    <img
                      src={complaint?.img}
                      alt={complaint?.title}
                      className="h-[148px] w-[220px] rounded-lg object-cover "
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-lg font-semibold text-green-200">
                        {complaint.title}
                      </p>
                      <p className="text-xs text-yellow-200">
                        {complaint.body.split(" ").length > TRUNCATE_LENGTH
                          ? complaint.body
                              .split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ") + "..."
                          : complaint.body}
                      </p>

                      {(user.accountType === ACCOUNT_TYPE.WARDEN ||
                        user.accountType === ACCOUNT_TYPE.ACCOUNTANT) && (
                        <>
                          {complaint.isResolved ? (
                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                              <HiClock size={14} />
                              Resolved
                            </p>
                          ) : (
                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                              <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                <FaCheck size={8} />
                              </div>
                              Unresolved
                              <button
                                disabled={loading}
                                className="bg-slate-500 p-1 text-yellow-200"
                                onClick={() =>
                                  handleResolveClick(complaint._id)
                                }
                              >
                                Resolved
                              </button>
                              {/* {complaint.isResolved === true && (
                          <p>Resolve by {complaint.resolvedBy}</p>
                        )} */}
                            </p>
                          )}
                        </>
                      )}
                      {(user.accountType === ACCOUNT_TYPE.STUDENT ||
                        user.accountType === ACCOUNT_TYPE.MESS_COMMITEE) && (
                        <>
                          {complaint.isResolved ? (
                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                              <FaCheck size={14} />
                              Resolved
                            </p>
                          ) : (
                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                              <HiClock size={8} />
                              Unresolved
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </Td>
                  <Td className="flex gap-x-4">
                    <p className="text-[20px] text-green-200">
                      {formattedDate(complaint.createdAt)}
                    </p>
                  </Td>
                </>
                {user.accountType === ACCOUNT_TYPE.STUDENT && (
                  <>
                    <Td className="text-sm font-medium text-orange-200 flex flex-col gap-1">
                      <button
                        disabled={loading}
                        className="  text-yellow-200"
                        onClick={() => onUpvote(complaint._id)}
                      >
                        <BiSolidUpvote /> {complaint?.upVotedBy?.length}
                      </button>
                    </Td>
                    <Td className="text-sm font-medium text-orange-200 flex flex-col gap-1">
                      <button
                        disabled={loading}
                        className="text-yellow-200"
                        onClick={() => onDownvote(complaint._id)}
                      >
                        <BiSolidDownvote /> {complaint?.downVotedBy?.length}
                      </button>
                    </Td>
                  </>
                )}
                {(user.accountType === ACCOUNT_TYPE.WARDEN ||
                  user.accountType === ACCOUNT_TYPE.ACCOUNTANT ||
                  user.accountType === ACCOUNT_TYPE.MESS_COMMITEE) && (
                  <>
                    <Td className="text-orange-200 flex flex-col gap-1">
                      <p>
                        <BiSolidUpvote /> {complaint?.upVotedBy?.length}
                      </p>
                    </Td>
                    <Td className="text-orange-200 flex flex-col gap-1">
                      <p>
                        <BiSolidDownvote /> {complaint?.downVotedBy?.length}
                      </p>
                    </Td>
                  </>
                )}
                {/* {(user.accountType === ACCOUNT_TYPE.WARDEN ||
                  user.accountType === ACCOUNT_TYPE.ACCOUNTANT) && (*/}
                <>
                  <Td className="text-sm font-medium text-red-100 ">
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete this Complaint?",
                          text2:
                            "All the data related to this Complaint will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...  ",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleComplaintDelete(complaint._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        });
                      }}
                      title="Delete"
                      className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </Td>
                </>
                {/*  )} */}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {/* <Table className="rounded-xl border border-richblack-800 ">
        {loading && <p>Loading...</p>}

        {!loading && !myComplaints.length && (
          <p>You haven't created any complaints yet.</p>
        )}

        {!loading && myComplaints.length && (
          <ComplaintList complaints={myComplaints} />
        )}
      </Table> */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};
export default ComplaintTable2;
