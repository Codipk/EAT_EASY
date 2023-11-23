// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { getNutritionDetails } from "../../../services/operations/messcommitteeAPI";
// import { Pie } from "react-chartjs-2";

// const NutritionChart = () => {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);

//   const [nutritionData, setNutritionData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getNutritionDetails(
//           token,
//           "your-item-name",
//           100
//         ); // Replace 'your-item-name' with the actual item name
//         setNutritionData(response?.data?.data[0]);
//       } catch (error) {
//         console.error("Error fetching nutrition details:", error.message);
//         toast.error("Error fetching nutrition details");
//       }
//     };

//     fetchData();
//   }, [token]);

//   // Calculate total energy
//   const totalEnergy = nutritionData
//     ? nutritionData.calories * nutritionData.itemQuantity
//     : 0;

//   // Prepare data for the pie chart
//   const chartData = {
//     labels: ["Calories", "Protein", "Carbohydrate", "Fats"],
//     datasets: [
//       {
//         data: [
//           nutritionData?.calories || 0,
//           nutritionData?.protein || 0,
//           nutritionData?.carbohydrate || 0,
//           nutritionData?.fats || 0,
//         ],
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
//         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Nutrition Chart</h2>
//       <Pie data={chartData} />
//       <p>Total Energy: {totalEnergy} calories</p>
//     </div>
//   );
// };

// export default NutritionChart;
