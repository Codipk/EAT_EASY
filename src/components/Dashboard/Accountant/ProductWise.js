// ProductWiseBarChart.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  fetchExpenseCategoryWiseAndTotal,
  fetchExpenseProductWiseAndTotal,
} from "../../../services/operations/ExpenseAPI";
import { useSelector } from "react-redux";

const ProductWise = ({ productCategory }) => {
  const { token } = useSelector((state) => state.auth);
  const [productList, setProductList] = useState([]);
  const [productData, setProductData] = useState([]);
  console.log("product Cate", productCategory);
  useEffect(() => {
    const fetchCategorywiseProduct = async () => {
      try {
        const response = await fetchExpenseCategoryWiseAndTotal(
          token,
          productCategory
        );

        if (response?.success) {
          console.log("categoryData", response);
          // Assuming the API response has an array of product names under categoryWiseExpense
          const productNames = response?.categoryWiseExpense.map(
            (data) => data.productName
          );
          setProductList(productNames);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategorywiseProduct();
  }, [productCategory, token]);
  console.log("productList", productList);
  useEffect(() => {
    const fetchProductwiseExpense = async () => {
      try {
        const promises = productList.map((productName) =>
          fetchExpenseProductWiseAndTotal(token, productName)
        );

        const productDetails = await Promise.all(promises);
        console.log("productDetails", productDetails);
        setProductData(productDetails);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (productList.length > 0) {
      fetchProductwiseExpense();
    }
  }, [productList, token]);

  // //////get the details of all product
  console.log("productData", productData);

  // Create data for bar chart
  const barChartData = {
    labels: productList,
    datasets: [
      {
        label: "Total Expense",
        data: productData.map((data) => data.total || 0),
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
        title: {
          display: true,
          text: "Product Names",
          color: "white",
        },
        ticks: {
          color: "white", // Adjust the font color of x-axis labels here
        },
      },
      y: {
        beginAtZero: true,

        title: {
          display: true,
          text: "Total Expense", // Set your x-axis label text here
          color: "white",
          size: 32, // Adjust the font size here
        },
        ticks: {
          color: "white", // Adjust the font color of x-axis labels here
        },
      },
    },
  };

  return (
    <div>
      <h2>Total Expense by Product of Category: {productCategory}</h2>
      {/* Display product names */}
      <ul>
        <Bar data={barChartData} options={barChartOptions} />
      </ul>
      {/* You can use the product names to fetch and display further details */}
      {/* <Bar data={chartDataConfig} options={options} /> */}
    </div>
  );
};

export default ProductWise;
