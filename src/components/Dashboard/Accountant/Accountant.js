import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostelWiseExpenses } from "../../../services/operations/ExpenseAPI"; // Import the function to fetch expenses
import ProductWise from "./ProductWise";
import { Link } from "react-router-dom";
import CategoryWise from "./CategoryWise";
import Ranges from "./Ranges";
const Accountant = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [expenseData, setExpenseData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getExpenseDataWithStats = async () => {
      setLoading(true);
      try {
        // Fetch expense data using the appropriate API function
        const result = await fetchHostelWiseExpenses(token, dispatch);
        console.log(result);

        if (result) {
          setExpenseData(result);
        }
      } catch (error) {
        console.error("Error fetching expense data:", error);
      } finally {
        setLoading(false);
      }
    };

    getExpenseDataWithStats();
  }, [token]);

  const totalExpenses = expenseData?.length;

  return (
    <div className="text-white">
      <div>
        <h1 className="font-extrabold text-2xl">Hi {user?.firstName} 👋</h1>
        <p className="text-xl">Let's manage your expenses</p>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : totalExpenses > 0 ? (
        <div>
          {/* Display expense-wise statistics */}

          <div className="my-4 flex-[450px] space-x-10">
            {/* <ProductWise token={token} /> */}
            <CategoryWise />
            {/* <Ranges /> */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 py-6 px-32">
              {/* <div className="flex flex-col py-4 text-xl">
                <p className="font-extrabold">Total Quantity</p>
                <p className="font-semibold">{totalExpenses}</p>
              </div> */}
            </div>
          </div>

          {/* Render expenses */}
          <div className="rounded-md bg-richblack-800 p-6">
            <div className="flex flex-row items-center justify-between">
              <p>Your Expenses</p>
              <Link to="/dashboard/all-expenses">
                <p>View all</p>
              </Link>
            </div>
            {/* <div className="my-4 flex items-start space-x-6">
              {expenseData.slice(0, 3).map((expense) => (
                <div className="w-1/3" key={expense._id}>
                  {/* Display expense details */}
            {/* Adjust as per your expense data structure */}
            {/* <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-richblack-50">
                      {expense.expenseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p>Amount: Rs {expense.totalAmountGenerated}</p>
                      <p> | </p>
                      <p>Date: {expense.date}</p>
                    </div>
                  </div> */}
            {/* </div>
              ))}
            // </div> */}
          </div>
        </div>
      ) : (
        <div>
          <p>You have not created any expenses yet</p>
          <Link to={"/dashboard/add-expense"}>Create an Expense</Link>
        </div>
      )}
    </div>
  );
};

export default Accountant;
