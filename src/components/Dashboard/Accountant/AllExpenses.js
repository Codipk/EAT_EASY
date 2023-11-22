import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostelWiseExpenses } from "../../../services/operations/ExpenseAPI";
import { setAllExpenses, setTotalExpense } from "../../../slices/expenseSlice";
import ExpenseTable from "./ExpenseTable";
import { fetchTotalExpense } from "../../../services/operations/ExpenseAPI";
const AllExpenses = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [showTotal, setShowTotal] = useState(false);

  const getTotalExpense = async () => {
    try {
      setLoading(true);
      const total = await fetchTotalExpense(token);
      setTotal(total);
      console.log("total", total);
      dispatch(setTotalExpense(total));
      setLoading(false);
      setShowTotal(true);
    } catch (error) {
      console.error("Error getting total expense:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);

      try {
        // Fetch expenses using the API
        const result = await fetchHostelWiseExpenses(token);

        if (result) {
          // Set expenses in the local state
          setExpenses(result);

          // Update the Redux state
          dispatch(setAllExpenses(result));
        } else {
          console.log("No expenses found");
        }
      } catch (error) {
        console.error("Error fetching expenses:", error.message);
      }

      setLoading(false);
    };

    fetchExpenses();
  }, [token, dispatch]);
  const handleShowTotalClick = () => {
    getTotalExpense();
  };
  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">All Expenses</h1>
      </div>
      {loading && <p>Loading...</p>}
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">All Expenses</h1>
        {showTotal ? (
          <h2 className="text-3xl text-white">${total}</h2>
        ) : (
          <button
            onClick={handleShowTotalClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Show Total
          </button>
        )}
      </div>

      {/* if expenses exist then show the table */}
      {expenses.length > 0 ? (
        <>
          {/* <p>Total Expense ${total}</p> */}
          <ExpenseTable expenses={expenses} />
        </>
      ) : (
        <p>No expenses found</p>
      )}
    </div>
  );
};

export default AllExpenses;
