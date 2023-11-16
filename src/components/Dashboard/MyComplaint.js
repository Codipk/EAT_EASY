import { fetchAllMyComplaints } from "../../services/operations/ComplaintAPI";

import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ComplaintTable from "./ComplaintTable";

export default function MyComplaint() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState([]);
  console.log("print token", token);
  useEffect(() => {
    const fetchComplaint = async () => {
      const result = await fetchAllMyComplaints(token);
      //   console.log("printing result", result);
      if (result) {
        console.log("Fetching complaints in MyComplaint", result);
        setComplaint(result);
      } else {
        console.log("Not getting any complaint");
      }
    };
    fetchComplaint();
  }, []);

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Complaints</h1>
      </div>
      {/* if courses exist then show the table */}
      {complaint && (
        <ComplaintTable complaints={complaint} setComplaint={setComplaint} />
      )}
      {"No complaints till now !!!"}
    </div>
  );
}
