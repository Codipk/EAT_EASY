import {
  fetchExpenseProductWiseAndTotal,
  fetchExpenseCategoryWiseAndTotal,
} from "../../../services/operations/ExpenseAPI";

import { useSelector } from "react-redux";

import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

import apiConnector from "../../../services/apiconnector"; // Adjust the import path accordingly

const ProductWise = () => {
  const [expenseData, setExpenseData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const productCategory = "Dairy";
  const productName = "panni";
  const endDate = "2023-12-31";
  const startDate = "2021-01-01";
  useEffect(() => {
    fetch(
      `http://localhost:4000/api/v1/expense/getExpenseInRangeProductWiseAndTotal?startDate=${startDate}&endDate=${endDate}&productName=${productName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        // setCategoryData(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }, [productName, startDate, endDate]);

  return (
    <div>
      {/* Render your component content based on the fetched data */}
      {expenseData && (
        <>
          <h2>Total Expense: {expenseData.total}</h2>
          {/* Render other data as needed */}
        </>
      )}
    </div>
  );
};

export default ProductWise;
