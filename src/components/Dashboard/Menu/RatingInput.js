// RatingInput.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createRating } from "../../../services/operations/ratingAPI.js"; // Import your rating service
import { PencilSquare } from "react-bootstrap-icons";

const RatingInput = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [mealType, setMealType] = useState("breakFast");
  //   const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Today's date by default
  const date = Date.now();
  const [rating, setRating] = useState(1); // Default rating

  const handleRatingSubmit = async () => {
    try {
      // Dispatch the createRating action
      console.log("date", date);
      await dispatch(createRating({ mealType, date, rating, token }));

      // Reset the form after successful submission
      setMealType("breakFast");
      //   setDate(new Date().toISOString().split("T")[0]);
      setRating(1);

      // Show a success message to the user
      toast.success("Rating submitted successfully");
    } catch (error) {
      console.error("Error submitting rating:", error.message);
      // Show an error message to the user
      toast.error("Error submitting rating");
    }
  };

  return (
    <div>
      <h2 className="text-white">Rate a Meal</h2>
      <label>
        <p className="text-white"> Meal Type:</p>
        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option value="breakFast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="snacks">Snacks</option>
          <option value="dinner">Dinner</option>
        </select>
      </label>
      {/* <br />
      <label>
        <p className="text-white">Date:</p>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label> */}
      <br />
      <label>
        <p className="text-white"> Rating:</p>

        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </label>
      <br />
      <button
        className="text-white p-2 bg-slate-400"
        onClick={handleRatingSubmit}
      >
        Submit Rating
      </button>
    </div>
  );
};

export default RatingInput;
