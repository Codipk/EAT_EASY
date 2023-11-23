// PieChart.js

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = ({ chartData, options, onCategoryClick }) => {
  const handleCategoryClick = (_, elements) => {
    if (elements[0]) {
      console.log("elements", elements);
      const category = chartData.labels[elements[0].productCategory];
      console.log("chardata", chartData);
      const productName = chartData.labels[elements[0].productName];
      console.log("productNAme", productName);
      onCategoryClick(category);
    }
  };
  console.log("chart data", chartData);
  return (
    <div className=" flex-1 rounded-md bg-richblack-800 py-3 px-2 ">
      {chartData && (
        <Pie
          data={chartData}
          options={{
            ...options,
            onClick: handleCategoryClick,
          }}
        />
      )}
    </div>
  );
};

export default PieChart;
