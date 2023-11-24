import React, { useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense } from "../../../services/operations/ExpenseAPI";
import { formattedDate } from "../../../utils/dateFormatter";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "../../common/ConfirmationModal";
import { fetchHostelWiseExpenses } from "../../../services/operations/ExpenseAPI";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";

const ExpenseTable = ({ expenses, setExpenses }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const navigate = useNavigate();
  const handleExpenseDelete = async (expenseId) => {
    setLoading(true);
    const expense_Id = expenseId.toString();

    // Assuming you have an API function deleteExpense
    await deleteExpense({ expenseId: expense_Id }, token);

    // Fetch the updated list of expenses after deletion
    const updatedExpenses = await fetchHostelWiseExpenses(token);
    console.log("Updated expense", updatedExpenses);
    if (updatedExpenses) {
      //   setExpenses(updatedExpenses);
      // toast.success("Expense Deleted Successfully");
      console.log("updated expense", updatedExpenses);
    }

    setConfirmationModal(null);
    setLoading(false);
  };
  console.log("Expense", expenses);

  return (
    <>
      <Table className="rounded-xl border border-richblack-800">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-yellow-100 px-6 py-2">
            <Th className="text-left text-sm font-medium uppercase text-slate-200">
              Complaint Name
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-slate-200">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-slate-200">
              Quantity
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-slate-200">
              Date
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-slate-200">
              Delete
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-slate-200">
              Edit
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {expenses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No Expenses found
              </Td>
            </Tr>
          ) : (
            expenses?.map((expense) => (
              <Tr
                key={expense._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                {/* <Td className="text-white "></Td> */}
                <Td>
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-white">
                      {expense.productName}
                    </p>
                    <p className="text-xs text-white">
                      {" "}
                      {expense.productDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formattedDate(expense.createdAt)}
                    </p>
                  </div>
                </Td>

                <Td className="text-sm font-medium text-white">
                  {expense.productPrice}
                </Td>
                <Td className="text-sm font-medium text-white">
                  {expense.productQuantity}
                </Td>
                <Td>
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-expense/${expense._id}`);
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 text-white hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this Expense?",
                        text2:
                          "All the data related to this Expense will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleExpenseDelete(expense._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 text-red-500 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default ExpenseTable;
