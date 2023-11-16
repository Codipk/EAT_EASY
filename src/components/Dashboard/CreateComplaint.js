import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ComplaintCreation } from "../../services/operations/ComplaintAPI";
import { addComplaint } from "../../slices/complaintSlice";
import IconBtn from "../common/IconBtn";
import Upload from "./Upload";
import { MdNavigateNext } from "react-icons/md";
const CreateComplaint = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  //handles next button click
  const onSubmit = async (complaint) => {
    //create a new course
    const formData = new FormData();
    console.log("data", complaint);
    console.log(complaint.title);
    formData.append("title", complaint.title);
    console.log(formData.title);
    formData.append("body", complaint.body);
    formData.append("img", complaint.img);
    setLoading(true);
    console.log("BEFORE add complaint API call");
    console.log("PRINTING FORMDATA", formData);
    const result = await ComplaintCreation(formData, token);
    if (result) {
      dispatch(addComplaint(result));
    }
    setLoading(false);
    console.log("PRINTING FORMDATA", formData);
    console.log("PRINTING result", result);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="title">
          Complaint Title<sup className="text-pink-200">*</sup>
        </label>
        <input
          id="title"
          placeholder="Enter Complaint Title"
          {...register("title", { required: true })}
          className=" form-style w-full"
        />
        {errors.title && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Complaint Title is Required*
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="body">
          Complaint Description<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="body"
          placeholder="Enter Description"
          {...register("body", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.body && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Complaint Description is required**
          </span>
        )}
      </div>

      {/* create a component for uploading and showing preview of media */}
      <Upload
        name="img"
        label="Complaint Img"
        register={register}
        setValue={setValue}
        errors={errors}
      />
      <button
        type="submit"
        className="text-black p-2 bg-slate-500  rounded-md mt-2"
      >
        Submit
      </button>
      <div className="flex justify-end gap-x-2">
        <IconBtn disabled={loading} text={"Save Changes"}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
};

export default CreateComplaint;
