// IndividualComplaint.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchComplaintById,
  addCommentToComplaint,
  getCommentsByComplaintId,
} from "../../../../services/operations/ComplaintAPI";
import { useSelect } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const IndividualComplaint = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { token } = useSelector((state) => state.auth);
  const [showComments, setShowComments] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await fetchComplaintById(id, token);
        if (response) {
          setComplaint(response);
        } else {
          console.error("Error fetching complaint");
        }
      } catch (error) {
        console.error("Error fetching complaint:", error);
      }
    };

    fetchComplaint();
  }, [id, token]);
  console.log("complaint", complaint);
  const handleAddComment = async (e) => {
    e.preventDefault();
    console.log("inside handle add complaint");
    try {
      // Assuming addCommentToComplaint is a function that adds a comment to the complaint
      const response = await addCommentToComplaint(id, comment, token);
      if (response) {
        // Update the local state or fetch the updated complaint again
        console.log("response in adding comment", response);
        setComplaint(response);
        setComment(""); // Clear the comment input
      } else {
        console.error("Error adding comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleGetComment = async (e) => {
    e.preventDefault();
    try {
      const response = await getCommentsByComplaintId(id, token);
      console.log("GETTING COMMENT ALL>>>>>>>>>>>>", response);
      if (response) {
        setComment(response);
      } else {
        console.error("Error fetching comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  if (!complaint) {
    return <div>Loading...</div>;
  }
  const toggleComments = async (e) => {
    e.preventDefault();
    if (!showComments) {
      // Fetch comments only when showing comments
      await handleGetComment();
    }
    if (showComments) setComment(null);
    setShowComments(!showComments);
  };
  const handleGetComments = async () => {
    try {
      setIsLoadingComments(true);
      const response = await getCommentsByComplaintId(id, token);
      if (response) {
        setComments(response);
      } else {
        console.error("Error fetching comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };
  console.log("COMMENTT", comment);

  return (
    <>
      <div>
        <form className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row gap-2">
              <label className="text-orange-300 font-semibold p-2">
                Title:
              </label>
              <input
                type="text"
                className="form-style"
                value={complaint?.title}
                readOnly
              />
            </div>

            <div className="flex-flex-row gap-2">
              <label className="text-orange-300 font-semibold p-2">
                Complaint Desc:
              </label>{" "}
              <input
                type="text"
                className="form-style"
                value={complaint?.body}
                readOnly
              />
            </div>
            <label className="text-orange-300 font-semibold p-2">
              upVotedBy
            </label>
            <input
              type="text"
              className="form-style"
              value={complaint?.upVotedBy?.length}
              readOnly
            />
            <label className="text-orange-300 font-semibold p-2">
              downVotedBy
            </label>
            <input
              type="text"
              className="form-style"
              value={complaint?.downVotedBy?.length}
              readOnly
            />
            <label className="text-orange-300 font-semibold p-2">
              Status of Complaint
            </label>
            <input
              type="text"
              className="form-style"
              value={complaint?.isResolved ? "Resolved" : "Unresolved"}
              style={{ color: complaint?.isResolved ? "green" : "red" }}
              readOnly
            />
            {/* add resolved by */}
            <label className="text-orange-300 font-semibold p-2">
              Created By:
            </label>
            <input
              type="text"
              className="form-style"
              value={complaint?.author?.firstName}
              readOnly
            />

            {/* Add more fields as needed */}

            <div className="flex flex-col gap-2">
              <div className="flex-row gap-2">
                <div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add your comment..."
                  />
                </div>
                <button
                  className="text-white bg-slate-500 p-2 rounded-md"
                  onClick={handleAddComment}
                >
                  Add Comment
                </button>
              </div>
              <button
                onClick={() => {
                  handleGetComments();
                  setShowComments(true);
                }}
                disabled={isLoadingComments}
                className="bg-red-200"
              >
                {isLoadingComments
                  ? "Loading Comments..."
                  : "Show All Comments"}
              </button>
              {showComments && (
                <ul className="form-style text-white">
                  {comments.map((comment) => (
                    <div key={comment._id}>
                      <p>
                        {comment?.userName}: {comment.text}{" "}
                      </p>
                    </div>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* You can also add buttons, submit handlers, etc. */}
        </form>
      </div>
    </>
  );
};

export default IndividualComplaint;
