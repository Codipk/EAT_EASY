// RatingDisplay.js

import React, { useState, useEffect } from "react";
import { getAverageRating } from "../../../services/operations/ratingAPI";
import toast from "react-hot-toast";

const RatingDisplay = ({ token }) => {
  const [averageRatings, setAverageRatings] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratings = await getAverageRating(token);
        setLoading(false);
        setAverageRatings(ratings);
      } catch (error) {
        console.error("Error fetching average ratings:", error.message);
        // toast.error("Error fetching average ratings");
      }
    };

    fetchRatings();
  }, [token]);
  console.log("average ratings", averageRatings);
  const res = averageRatings.result;

  return (
    // <div>
    //   <h2 className="text-2xl font-bold mb-4">Average Ratings</h2>
    //   <table className="table table-bordered text-center">
    //     <thead>
    //       <tr className="bg-gray-300">
    //         <th>Meal Type</th>
    //         <th>Average Rating</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {res.map((rating) => (
    //         <tr key={rating._id}>
    //           <td className="font-bold">{rating._id}</td>
    //           <td>{rating.averageRating}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div>
      <h2 className="text-2xl text-red-200 mt-2 font-bold mb-4">
        Average Ratings
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered text-center">
          <thead>
            <tr className="bg-gray-300">
              <th>Meal Type</th>
              <th className="text-red-200">Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {res?.map((rating) => (
              <tr key={rating?._id}>
                <td className="font-bold">{rating._id}</td>
                <td>{rating.averageRating.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RatingDisplay;
