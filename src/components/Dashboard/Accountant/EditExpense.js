import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  setProductName,
  setProductDescription,
  setProductQuantity,
  setProductPrice,
  setError,
} from "../../../slices/expenseSlice";
import {
  editExpense,
  fetchExpenseDetails,
  getExpenseById,
} from "../../../services/operations/ExpenseAPI";
import ExpenseForm from "./ExpenseForm";
import IconBtn from "../../common/IconBtn";
import { useNavigate, useParams } from "react-router-dom";
const categoryOptions = [
  "Vegetables",
  "Oils",
  "Groceries",
  "Dairy",
  "Furniture-and-Utensils",
  "Others",
];
const EditExpense = ({ expense }) => {
  // const { expense } = useSelector((state) => state.expense);
  const { expenseId } = useParams();
  console.log("expenseId", expenseId);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  console.log("expense", expense);
  useEffect(() => {
    const getExpense = async () => {
      try {
        const response = await getExpenseById(token, expenseId);
        console.log("response", response);
        const expense = response.expense;
        if (response) {
          setValue("productName", expense.productName);
          setValue("productDescription", expense.productDescription);
          setValue("productQuantity", expense.productQuantity);
          setValue("productPrice", expense.productPrice);
          setValue("productCategory", expense.productCategory);
        }
      } catch (error) {
        console.log("error in fetching expense by id", error);
      }
    };
    getExpense();
  }, [token, dispatch]);

  const submitExpenseForm = async (data) => {
    console.log("Form Data - ", data);
    console.log("expense Id", expenseId);
    const currentDate = new Date().toISOString().split("T")[0];
    data.dateOfExpense = currentDate;
    console.log("data", data);
    const result = await dispatch(
      editExpense(
        expenseId,
        data.productName,
        data.productDescription,
        data.productQuantity,
        data.productPrice,
        data.dateOfExpense,
        data.productCategory,
        token
      )
    );

    if (result) {
      // Handle success, e.g., navigate to expense list page
      console.log("Response in submitEdit", result);
      navigate("/dashboard/all-expenses");
    } else {
      console.log("updated expense is null");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitExpenseForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-yellow-100 p-8 px-12">
          <h2 className="text-lg font-semibold text-white">
            Expense Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="productName" className="lable-style">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                id="productName"
                placeholder="Enter Product Name"
                className="form-style"
                {...register("productName", { required: true })}
                defaultValue={expense?.productName}
              />
              {errors.productName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter Product Name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="productDescription" className="lable-style">
                Product Description
              </label>
              <input
                type="text"
                name="productDescription"
                id="productDescription"
                placeholder="Enter Product Description"
                className="form-style"
                {...register("productDescription", { required: true })}
                defaultValue={expense?.productDescription}
              />
              {errors.productDescription && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter Product Description.
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="productQuantity" className="lable-style">
                Product Quantity
              </label>
              <input
                type="text"
                name="productQuantity"
                id="productQuantity"
                placeholder="Enter Product Quantity"
                className="form-style"
                {...register("productQuantity", { required: true })}
                defaultValue={expense?.productQuantity}
              />
              {errors.productQuantity && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter Product Quantity.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="productPrice" className="lable-style">
                Product Price
              </label>
              <input
                type="number"
                name="productPrice"
                id="productPrice"
                placeholder="Enter Product Price"
                className="form-style"
                {...register("productPrice", { required: true })}
                defaultValue={expense?.productPrice}
              />
              {errors.productPrice && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter Product Price.
                </span>
              )}
            </div>
          </div>
          {/* <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="category" className="lable-style">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Enter Category"
                className="form-style"
                {...register("category", { required: true })}
                defaultValue={expense?.category}
              />
              {errors.category && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter Category.
                </span>
              )}
            </div>
            </div> */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="category" className="lable-style">
                Category
              </label>
              <select
                id="productCategory"
                name="productCategory"
                className="form-style"
                {...register("productCategory", { required: true })}
                defaultValue={expense?.productCategory}
              >
                <option value="">Select Category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.productCategory && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please select Category.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/all-expenses");
            }}
            className="cursor-pointer rounded-md bg-slate-500 py-2 px-5 font-semibold text-white"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  );
};

export default EditExpense;
