// import React, { useState, useEffect, useMemo } from "react";
// import {
//   fetchExpenseProductWiseAndTotal,
//   fetchExpenseCategoryWiseAndTotal,
// } from "../../../services/operations/ExpenseAPI";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
// import { useSelector } from "react-redux";
// ChartJS.register(ArcElement, Tooltip, Legend);

// const ProductWise = () => {
//   const categories = useMemo(
//     () => [
//       "Vegetables",
//       "Oils",
//       "Groceries",
//       "Dairy",
//       "Furniture-and-Utensils",
//       "Others",
//     ],
//     []
//   );
//   const { token } = useSelector((state) => state.auth);
//   console.log("token categories", token, categories);
//   const [chartData, setChartData] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [individualExpenses, setIndividualExpenses] = useState(null);

//   //   useEffect(() => {
//   //     const dummyData = [
//   //       { label: "Vegetables", data: 200 },
//   //       { label: "Oils", data: 150 },
//   //       { label: "Groceries", data: 100 },
//   //       { label: "Dairy", data: 50 },
//   //       { label: "Furniture-and-Utensils", data: 75 },
//   //       { label: "Others", data: 120 },
//   //     ];
//   //     const fetchData = async () => {
//   //       try {
//   //         const promises = dummyData.map(async (productCategory) => {
//   //           console.log("Token", token, productCategory);
//   //           const data = await fetchExpenseCategoryWiseAndTotal(
//   //             token,
//   //             productCategory
//   //           );
//   //           console.log("data", data);
//   //           console.log("productCategory", productCategory);
//   //           return {
//   //             label: productCategory,
//   //             // labels: dummyData.map((result) => result.label),
//   //             data: data.total || 0,
//   //           };
//   //         });

//   //         const results = await Promise.all(promises);

//   //         setChartData({
//   //           labels: results.map((result) => result.label),
//   //           datasets: [
//   //             {
//   //               data: results.map((result) => result.data),
//   //               backgroundColor: [
//   //                 "red",
//   //                 "blue",
//   //                 "green",
//   //                 "yellow",
//   //                 "purple",
//   //                 "orange",
//   //               ], // Add more colors as needed
//   //               borderColor: [
//   //                 "rgba(255, 99, 132, 1)",
//   //                 "rgba(54, 162, 235, 1)",
//   //                 "rgba(255, 206, 86, 1)",
//   //                 "rgba(75, 192, 192, 1)",
//   //                 "rgba(153, 102, 255, 1)",
//   //                 "rgba(255, 159, 64, 1)",
//   //               ],
//   //               borderWidth: 1,
//   //             },
//   //           ],
//   //         });
//   //       } catch (error) {
//   //         console.error("Error fetching total expense category-wise:", error);
//   //       }
//   //     };

//   //     fetchData();
//   //   }, [token, categories]);
//   //   console.log("chart data", chartData);
//   //   const handleCategoryClick = async (category) => {
//   //     try {
//   //       const data = await fetchExpenseProductWiseAndTotal(token, category);
//   //       console.log("fetch product wise ", data);
//   //       setSelectedCategory(category);
//   //       setIndividualExpenses(data.productNameWiseExpense);
//   //     } catch (error) {
//   //       console.error(
//   //         `Error fetching product-wise expense for ${category}:`,
//   //         error
//   //       );
//   //     }
//   //   };
//   //   let productCategory = "Milk"; // Set the category name you want to fetch
//   let [productCategory, setProductCategory] = useState("Milk");
//   useEffect(() => {
//     // Fetch data from the server
//     fetch(`/api/expense?productCategory=${productCategory}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         // You might need to include additional headers if required by your server
//       },
//       // You can include other fetch options like credentials, etc., if needed
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the response data
//         setProductCategory(data);
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error("Error fetching data:", error);
//       });
//   }, [productCategory]);

//   return (
//     <div>
//       <h2>Inside pie chart</h2>
//       {/* <>
//         {chartData && (
//           <div>
//             <Pie
//               data={chartData}
//               options={{
//                 onClick: (_, chartElements) => {
//                   console.log(chartElements);
//                   if (chartElements.length > 0) {
//                     const category = chartData.labels[chartElements[0].index];
//                     handleCategoryClick(category);
//                   }
//                 },
//               }}
//             />
//           </div>
//         )}

//         {selectedCategory && individualExpenses && (
//           <div>
//             <h2>Individual Expenses for Category: {selectedCategory}</h2>
//             <ul>
//               {individualExpenses.map((expense) => (
//                 <li key={expense._id}>
//                   {expense.productName}: {expense.productPrice}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </> */}
//     </div>
//   );
// };

// export default ProductWise;

// // const ProductWise = () => {
// //   const categories = useMemo(
// //     () => [
// //       "Vegetables",
// //       "Oils",
// //       "Groceries",
// //       "Dairy",
// //       "Furniture-and-Utensils",
// //       "Others",
// //     ],
// //     []
// //   );
// //   const { token } = useSelector((state) => state.auth);
// //   console.log("token categories", token, categories);
// //   const [chartData, setChartData] = useState(null);
// //   const [selectedCategory, setSelectedCategory] = useState(null);
// //   const [individualExpenses, setIndividualExpenses] = useState(null);

// //   useEffect(() => {
// //     // Replace this with your actual data fetching logic
// //     // This is just dummy data for demonstration purposes
// //     const fetchData = async () => {
// //       try {
// //         const dummyData = [
// //           { label: "Vegetables", data: 200 },
// //           { label: "Oils", data: 150 },
// //           { label: "Groceries", data: 100 },
// //           { label: "Dairy", data: 50 },
// //           { label: "Furniture-and-Utensils", data: 75 },
// //           { label: "Others", data: 120 },
// //         ];

// //         setChartData({
// //           labels: dummyData.map((result) => result.label),
// //           datasets: [
// //             {
// //               data: dummyData.map((result) => result.data),
// //               backgroundColor: [
// //                 "red",
// //                 "blue",
// //                 "green",
// //                 "yellow",
// //                 "purple",
// //                 "orange",
// //               ],
// //               borderColor: [
// //                 "rgba(255, 99, 132, 1)",
// //                 "rgba(54, 162, 235, 1)",
// //                 "rgba(255, 206, 86, 1)",
// //                 "rgba(75, 192, 192, 1)",
// //                 "rgba(153, 102, 255, 1)",
// //                 "rgba(255, 159, 64, 1)",
// //               ],
// //               borderWidth: 1,
// //             },
// //           ],
// //         });
// //       } catch (error) {
// //         console.error("Error fetching total expense category-wise:", error);
// //       }
// //     };

// //     fetchData();
// //   }, [token, categories]);

// //   const handleCategoryClick = async (category) => {
// //     // Dummy data for individual expenses, replace with actual data fetching logic
// //     const dummyIndividualExpenses = [
// //       { _id: 1, productName: "Item 1", productPrice: 30 },
// //       { _id: 2, productName: "Item 2", productPrice: 20 },
// //       { _id: 3, productName: "Item 3", productPrice: 25 },
// //     ];

// //     setSelectedCategory(category);
// //     setIndividualExpenses(dummyIndividualExpenses);
// //   };

// //   return (
// //     <div>
// //       <h2>Inside pie chart</h2>
// //       <>
// //         <div className=" flex-1 rounded-md bg-richblack-800  w-auto">
// //           {chartData && (
// //             <div>
// //               <Pie
// //                 data={chartData}
// //                 options={{
// //                   onClick: (_, chartElements) => {
// //                     if (chartElements.length > 0) {
// //                       const category = chartData.labels[chartElements[0].index];
// //                       handleCategoryClick(category);
// //                     }
// //                   },
// //                 }}
// //               />
// //             </div>
// //           )}
// //         </div>
// //         {selectedCategory && individualExpenses && (
// //           <div>
// //             <h2>Individual Expenses for Category: {selectedCategory}</h2>
// //             <ul>
// //               {individualExpenses.map((expense) => (
// //                 <li key={expense._id}>
// //                   {expense.productName}: {expense.productPrice}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}
// //       </>
// //     </div>
// //   );
// // };

// // export default ProductWise;
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

const ProductWise = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Grocery");

  useEffect(() => {
    // Replace the endpoint with your actual API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/expense/getAllExpenseCategoryWiseAndTotal=${selectedCategory}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        // Handle the response data and update chartData
        setChartData({
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: [
                "red",
                "blue",
                "green",
                "yellow",
                "purple",
                "orange",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedCategory) {
      fetchData();
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h2>Inside pie chart</h2>
      {chartData && (
        <div>
          <Pie
            data={chartData}
            options={{
              onClick: (_, chartElements) => {
                if (chartElements.length > 0) {
                  const category = chartData.labels[chartElements[0].index];
                  handleCategoryClick(category);
                }
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductWise;
