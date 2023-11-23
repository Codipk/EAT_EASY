import React, { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { fetchExpenseCategoryWiseAndTotal } from "../../../services/operations/ExpenseAPI";
import PieChart from "./PieChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BarElement, CategoryScale, LinearScale, Title } from "chart.js";
import ProductWise from "./ProductWise";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);
const CategoryWise = () => {
  const [expenseData, setExpenseData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  let [productName, setProductName] = useState([]);
  const [productData, setProductData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const productCategories = useMemo(
    () => [
      "Vegetables",
      "Oils",
      "Groceries",
      "Dairy",
      "Furniture-and-Utensils",
      "Others",
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = productCategories.map((category) =>
          fetchExpenseCategoryWiseAndTotal(token, category)
        );

        const categoryData = await Promise.all(dataPromises);
        console.log("categoryData", categoryData);
        setExpenseData(categoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Run fetchData only when the component mounts or when the token or productCategories change
    fetchData();
  }, [token]);

  console.log("expensee data", expenseData);

  const barChartData = {
    labels:
      expenseData?.map(
        (data) => data?.categoryWiseExpense[0]?.productCategory || ""
      ) || [],
    datasets: [
      {
        label: "Total Expense",
        data: expenseData?.map((data) => data?.total || 0) || [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9800",
          "#795548",
        ],
      },
    ],
  };

  // Define bar chart options
  const barChartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        labels: [
          "Vegetables",
          "Oils",
          "Groceries",
          "Dairy",
          "Furniture-and-Utensils",
          "Others",
        ],
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Expense",
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        console.log("elements", elements);
        const clickedCategory = barChartData?.labels[elements[0].index];
        console.log("clicked category", clickedCategory);
        setSelectedCategory(clickedCategory);

        // category seleceted now get the productName associated with this category
        // and make the array of the productname then display the graph
      }
    },
  };
  console.log("selected category", selectedCategory);
  console.log("barchart data", barChartData);
  return (
    <div>
      <h2>Total Expenses by Category</h2>
      <div>
        {/* <PieChart
          chartData={chartData}
          options={options}
          onCategoryClick={handleCategoryClick}
        /> */}
        <Bar data={barChartData} options={barChartOptions} />
      </div>
      {selectedCategory && (
        <div>
          <h3>Details for {selectedCategory}</h3>
          <ProductWise productCategory={selectedCategory} />
          {/* Add code to display details of the selected category */}
        </div>
      )}
      <div>
        {/* Display the bar chart when a category is selected */}
        {/* {productName && productData && ( */}

        {/* )} */}
      </div>
    </div>
  );
};

export default CategoryWise;
