import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNutritionDetails } from "../../../services/operations/MessMenuAPI"; // Replace with the actual path to your API file
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const CalorieCalculate = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth); // Replace with your authentication state
  const [nutritionData, setNutritionData] = useState(null);

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [calories, setCalories] = useState(null);
  console.log("tokennnn", token);
  console.log("nutrition data", nutritionData);
  const handleCalculate = async () => {
    try {
      // Make sure you have the necessary API function in your services/operations/NutritionAPI file
      const response = await getNutritionDetails(token, itemName, itemQuantity);
      console.log("response", response);
      if (response && response.success) {
        setCalories(response.data.calories);
        setNutritionData(response?.data);
      } else {
        setCalories(null);
      }
    } catch (error) {
      console.error("Error calculating calories:", error);
    }
  };
  const caloriess = nutritionData?.calories || 0;
  const protein = nutritionData?.protein_g || 0;
  const carbohydrate = nutritionData?.carbohydrates_total_g || 0;
  const fats = nutritionData?.fat_total_g || 0;

  const totalEnergy = nutritionData
    ? (caloriess + protein + carbohydrate + fats) * itemQuantity
    : 0;
  //   console.log("calo", typeof );
  console.log("total calories", totalEnergy);
  // Prepare data for the pie chart
  const chartData = {
    labels: ["Calories", "Protein", "Carbohydrate", "Fats"],
    datasets: [
      {
        data: [
          nutritionData?.calories || 0,
          nutritionData?.protein_g || 0,
          nutritionData?.carbohydrates_total_g || 0,
          nutritionData?.fat_total_g || 0,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ],
  };

  return (
    <div>
      <h2 className="mb-6 ... mt-4 ... text-gray-100">
        Calorie Intake Calculator
      </h2>
      <div>
        <label className="mr-8 text-gray-100 ">Item Name:</label>

        <input
          type="text"
          value={itemName}
          placeholder="Enter Item Name"
          className="form-style mb-3 ml-1 rounded-md"
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div>
        <label className="mr-4 text-gray-100 ">Item Quantity:</label>
        <input
          type="text"
          value={itemQuantity}
          placeholder="Enter quantity in grams"
          className="form-style mb-2"
          onChange={(e) => setItemQuantity(e.target.value)}
        />
      </div>
      <button
        className="mt-3 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={handleCalculate}
      >
        Calculate Calories
      </button>
      {calories !== null && (
        <div className="w-1/3">
          <h2 className="mb-6 ... mt-4 ... text-gray-100">Nutrition Chart</h2>
          <Pie data={chartData} />
          <p className="p-2 text-white">
            {/* Total Energy: {totalEnergy.toFixed(4)}calories */}
          </p>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculate;
