// import React, { useState, useEffect } from "react";
// import { Line, time } from "react-chartjs-2";
// import {
//   fetchExpenseInRangeAndTotal,
//   fetchExpenseInRangeCategoryWiseAndTotal,
//   fetchExpenseInRangeProductWiseAndTotal,
// } from "../../../services/operations/ExpenseAPI";
// import { useSelector } from "react-redux";
// import "chartjs-adapter-date-fns";
// import { enGB } from "date-fns/locale";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   TimeScale,
//   registerables,
// } from "chart.js";
// ChartJS.register(
//   // CategoryScale,
//   // LinearScale,
//   // BarElement,
//   // Title,
//   // // TimeScale,
//   // ArcElement,
//   // Tooltip,
//   // Legend
//   ...registerables
// );
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  fetchExpenseInRangeAndTotal,
  fetchExpenseInRangeCategoryWiseAndTotal,
  fetchExpenseInRangeProductWiseAndTotal,
} from "../../../services/operations/ExpenseAPI";
import { useSelector } from "react-redux";
import "chartjs-adapter-date-fns";
import { enGB } from "date-fns/locale";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BarElement, CategoryScale, LinearScale, Title } from "chart.js";
import { registerables } from "chart.js";
ChartJS.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);
const ExpenseRangeChart = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [type, setType] = useState("categoryProduct");
  const [expenseData, setExpenseData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  console.log("hello");
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (type) {
          case "categoryProduct":
            console.log("inside categoryproduct");
            response = await fetchExpenseInRangeCategoryWiseAndTotal(
              token,
              startDate,
              endDate,
              categoryName
            );
            console.log("in the categoryProduct ", response);
            if (response.success) {
              console.log("Expense  category Range Data", response);
              setExpenseData(response.categoryWiseExpense);
            } else {
              console.error("Failed to fetch expense range data");
              setExpenseData([]);
            }
            break;
          case "product":
            response = await fetchExpenseInRangeProductWiseAndTotal(
              token,
              startDate,
              endDate,
              productName
            );
            console.log("in the product range", response);
            if (response.success) {
              console.log("ExpenseProduct Range Data", response);
              setExpenseData(response.productNameWiseExpense);
            } else {
              console.error("Failed to fetch expense range data");
              setExpenseData([]);
            }
            break;
          case "totalExpense":
            response = await fetchExpenseInRangeAndTotal(
              token,
              startDate,
              endDate
            );
            console.log("in the toal expense", response);
            if (response.success) {
              console.log("total Range Data", response);
              setExpenseData(response.ExpenseInRange);
            } else {
              console.error("Failed to fetch expense range data");
              setExpenseData([]);
            }
            break;
          default:
            break;
        }
        console.log(
          "reponse in api ",
          categoryName,
          productName,
          startDate,
          endDate
        );
      } catch (error) {
        console.error("Error fetching expense range data:", error);
      }
    };

    // Run fetchData when the component mounts or when the parameters change
    fetchData();
  }, [type, productName, categoryName, startDate, endDate]);
  console.log("expense data", expenseData);
  // Prepare chart data based on the fetched expenseData
  const chartData = {
    labels: expenseData?.map((product) => product.productName) || [],
    datasets: [
      {
        label: type === "categoryProduct" ? "Total Expense" : type,
        data: expenseData?.map((product) => product.productPrice) || [],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    scales: {
      x: {
        // type: "category",
        type: "category",
        labels: expenseData?.map((product) => product.productName) || [],
        // : expenseData?.map((product) => product.dateOfExpense) || [],
        ticks: {
          color: "white", // Adjust the font color of x-axis labels here
        },
        title: {
          display: true,
          text: "Products",
          color: "white",
        },
      },

      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Expense",
          color: "white",
        },
        ticks: {
          color: "white", // Adjust the font color of x-axis labels here
        },
      },
    },
    elements: {
      bar: {
        barThickness: 50, // Adjust the bar thickness here
      },
    },
    backgroundColor: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4CAF50",
      "#FF9800",
      "#795548",
    ],
  };
  console.log("chart data for bar", chartData);
  return (
    <div>
      <div className="flex flex-col gap-4 ">
        <h2 className="font-semibold mt-3 text-orange-200   text-2xl">
          {type === "categoryProduct"
            ? "Expense Range"
            : `Expense Range for ${type}`}
        </h2>
        <div>
          <label>Start Date: </label>{" "}
          <input
            type="date"
            value={startDate}
            className="block p-1  w-full text-l text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label>End Date:</label>{" "}
          <input
            type="date"
            value={endDate}
            className="block p-1  w-full text-l text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {type === "product" && (
          <div>
            <label>Product Name:</label>{" "}
            <input
              type="text"
              className="block p-1  w-full text-l text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
        )}
        <div>
          <label>Type:</label>{" "}
          <select
            value={type}
            className="block p-1  w-full text-l text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="categoryProduct">Category Product</option>
            <option value="product">Product</option>
            <option value="totalExpense">Total Expense</option>
          </select>
        </div>
        {type === "categoryProduct" && (
          <div>
            <label>Category Name:</label>{" "}
            <input
              type="text"
              className="block p-1  w-full text-l text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
        )}
      </div>

      <div style={{ width: "400px", height: "500px" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ExpenseRangeChart;
