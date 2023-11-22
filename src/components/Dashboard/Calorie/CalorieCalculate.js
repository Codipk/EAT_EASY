import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNutritionDetails } from "../../../services/operations/MessMenuAPI"; // Replace with the actual path to your API file

const CalorieCalculate = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth); // Replace with your authentication state

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [calories, setCalories] = useState(null);
  console.log("tokennnn", token);
  const handleCalculate = async () => {
    try {
      // Make sure you have the necessary API function in your services/operations/NutritionAPI file
      const response = await getNutritionDetails(token, itemName, itemQuantity);
      console.log("response", response);
      if (response && response.success) {
        setCalories(response.data.calories);
      } else {
        setCalories(null);
      }
    } catch (error) {
      console.error("Error calculating calories:", error);
    }
  };

  return (
    <div>
      <h2>Calorie Intake Calculator</h2>
      <div>
        <label>Item Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div>
        <label>Item Quantity:</label>
        <input
          type="text"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
      </div>
      <button onClick={handleCalculate}>Calculate Calories</button>
      {calories !== null && (
        <div>
          <p>Calories per Meal: {calories}</p>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculate;
