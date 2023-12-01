import React, { useState } from "react";
import "./style.css";
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
  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
            // Adjust the font size here
          },
          color: "#ffffff",
        },
      },
    },
  };
  return (
    <div>
      <h2 className="mb-6 mt-11 text-4xl font-serif text-green-400">
        Calorie Intake Calculator
      </h2>
      <div className="flex flex-col gap-3">
        <div>
          <label className="mr-8 text-xl font-semibold text-white ">
            Item Name:
          </label>

          <input
            type="text"
            value={itemName}
            placeholder="Enter Item Name"
            className=" text-gray-600 p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div>
          <label className="mr-8 text-xl font-semibold text-white ">
            Item Quantity:
          </label>
          <input
            type="text"
            value={itemQuantity}
            placeholder="Enter quantity in grams"
            // className=" border-spacing-5  shadow-slate-300 rounded-sm p-2 mb-2"
            className=" text-gray-600 p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setItemQuantity(e.target.value)}
          />
        </div>
        <button
          className="mt-3 py-2 px-4 bg-blue-500 w-fit text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={handleCalculate}
        >
          Calculate Calories
        </button>
        {calories !== null && (
          <div className="w-1/3 ">
            <h2 className="mb-6  mt-4  text-yellow-300 text-xl font-extrabold p-2">
              Nutrition Chart
            </h2>
            <Pie data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalorieCalculate;
