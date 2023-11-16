import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTitle,
  setBody,
  setImage,
  setError,
  addComplaint,
} from "../../slices/complaintSlice";
import Upload from "./Upload";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ComplaintCreation } from "../../services/operations/ComplaintAPI";
import IconBtn from "../common/IconBtn";
export default function AddComplaint() {
  const { complaint } = useSelector((state) => state.complaint);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitComplaintForm = async (data) => {
    console.log("FormData Image", data.complaintImage);
    console.log("Form Data - ", data);
    try {
      dispatch(ComplaintCreation(data, token));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitComplaintForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-yellow-100 p-8 px-12">
          <h2 className="text-lg font-semibold text-white">
            Complaint Information
          </h2>
          {/* first name and last name */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="title" className="lable-style">
                Complaint Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title"
                className="form-style"
                {...register("title", { required: true })}
                defaultValue={complaint?.title}
              />
              {errors.title && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter title .
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="body" className="lable-style">
                Description
              </label>
              <input
                type="text"
                name="body"
                id="body"
                placeholder="Enter desc"
                className="form-style"
                {...register("body", { required: true })}
                defaultValue={complaint?.body}
              />
              {errors.body && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter Description.
                </span>
              )}
            </div>
          </div>
          {/* dob and gender */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="complaintImage" className="lable-style">
                Upload Any file
              </label>
              <input
                type="file"
                name="complaintImage"
                id="complaintImage"
                className="form-style"
                {...register("complaintImage", {
                  // required: {
                  //   value: true,
                  //   message: "Please enter the images.",
                  // },
                })}
              />
              {/* <Upload
                name="complaintImage"
                label="Complaint Image"
                register={register}
                setValue={setValue}
                errors={errors}
                // editData={editCourse ? course?.thumbnail : null}
              /> */}

              {/* {errors.complaintImage && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.complaintImage.message}
                </span>
              )} */}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-complaint");
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
}
