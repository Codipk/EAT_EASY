import {
  fetchAllComplaints,
  fetchResolvedComplaintsAPI,
  fetchUnresolvedComplaintsAPI,
  likeComplaint,
  dislikeComplaint,
  fetchMostVotedComplaints,
  fetchMostRecentComplaints,
} from "../../services/operations/ComplaintAPI";

import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ComplaintTable2 from "./ComplaintTable";
import complaintSlice, {
  setResolvedComplaints,
  setUnresolvedComplaints,
  setMostVotedComplaints,
  setMostRecentComplaints,
  setAllComplaints,
} from "../../slices/complaintSlice";
import { downvote } from "../../slices/voteSlice";

export default function AllComplaints() {
  const filter = "all";
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [complaints, setComplaints] = useState([]);
  const [complaint, setComplaint] = useState([]);
  const [filterType, setFilterType] = useState("all"); // "all", "resolved", "unresolved"
  const [loading, setLoading] = useState(false);
  console.log("print token", token);
  // handle the resolved and unresolved complaints

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      let result;
      switch (filterType) {
        case "resolved":
          result = await fetchResolvedComplaintsAPI(token);
          if (result) {
            console.log("Fetching complaints in MyComplaint", result);
            setComplaint(result);
            dispatch(setResolvedComplaints(result));
          } else {
            console.log("dO NOT GETTING RESOLVED COMPLAINT");
          }

          break;
        case "unresolved":
          result = await fetchUnresolvedComplaintsAPI(token);
          if (result) {
            console.log("Fetching UNcomplaints in MyComplaint", result);
            setComplaint(result);
            dispatch(setUnresolvedComplaints(result));
          } else {
            console.log("dO NOT GETTING UNRESOLVED COMPLAINT");
          }

          break;
        case "mostVoted":
          result = await fetchMostVotedComplaints(token);
          if (result) {
            console.log("Fetching UNcomplaints in MyComplaint", result);
            setComplaint(result);
            dispatch(setMostVotedComplaints(result));
          } else {
            console.log("dO NOT GETTING UNRESOLVED COMPLAINT");
          }
          break;

        case "mostRecent":
          result = await fetchMostRecentComplaints(token);
          if (result) {
            console.log("Fetching recent in MyComplaint", result);
            setComplaint(result);
            dispatch(setMostRecentComplaints(result));
          } else {
            console.log("dO NOT GETTING UNRESOLVED COMPLAINT");
          }
          break;
        default:
          result = await fetchAllComplaints(token);
          console.log("printing result", result);
          if (result) {
            console.log("Fetching complaints in MyComplaint", result);
            setComplaint(result);
            dispatch(setAllComplaints(result));
          } else {
            console.log("Not getting any complaint");
          }

          break;
      }

      setLoading(false);
    };

    fetchComplaints();
  }, [filterType, token, dispatch]);
  console.log("complaint", complaint);

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        {/* <h1 className="text-3xl font-medium text-richblack-5">
          All Complaints
        </h1> */}
        {/* <label className="text-sm font-medium text-white bg-slate-50 mr-2">
          Filter:
        </label> */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-richblack-800 rounded px-2 py-1"
        >
          <option value="all">All Complaints</option>
          <option value="resolved">Resolved Complaints</option>
          <option value="unresolved">Unresolved Complaints</option>
          <option value="mostVoted">MostVoted Complaints</option>
          <option value="mostRecent">Most Recent Complaints</option>
        </select>
      </div>
      {/* if complaints exist then show the table */}
      {complaint && (
        <ComplaintTable2
          complaints={complaint}
          filter={filter}
          setComplaint={setComplaint}
        />
      )}
    </div>
  );
}
