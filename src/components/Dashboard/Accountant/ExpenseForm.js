import React from "react";

const ExpenseForm = ({ register, handleSubmit, errors, defaultValues }) => {
  return (
    <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-yellow-100 p-8 px-12">
      <h2 className="text-lg font-semibold text-white">Expense Information</h2>
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
            defaultValue={defaultValues?.productName || ""}
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
            defaultValue={defaultValues?.productDescription || ""}
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
            type="number"
            name="productQuantity"
            id="productQuantity"
            placeholder="Enter Product Quantity"
            className="form-style"
            {...register("productQuantity", { required: true })}
            defaultValue={defaultValues?.productQuantity || ""}
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
            defaultValue={defaultValues?.productPrice || ""}
          />
          {errors.productPrice && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter Product Price.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
