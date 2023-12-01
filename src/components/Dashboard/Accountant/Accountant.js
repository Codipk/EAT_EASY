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
      <div className="mt-4">
        <h1 className="font-extrabold text-2xl">Hi {user?.firstName} 👋</h1>
        <p className="text-xl">Let's manage your expenses</p>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : totalExpenses > 0 ? (
        <div>
          {/* Display expense-wise statistics */}

          <div className="my-4 flex ">
            {/* <ProductWise token={token} /> */}
            <CategoryWise />
            {/* <Ranges /> */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 py-6 px-32"></div>
          </div>

          {/* Render expenses */}
          <div className="rounded-md bg-richblack-800 p-6">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-purple-400">
                Your Expenses
              </h2>
              <Link to="/dashboard/all-expenses">
                <p className="font-serif text-lg">VIEW ALL</p>
              </Link>
            </div>
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
