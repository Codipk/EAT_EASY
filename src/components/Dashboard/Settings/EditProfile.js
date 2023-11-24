import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "../../../services/operations/SettingsAPI";
import IconBtn from "../../common/IconBtn";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    console.log("Form Data - ", data);
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-yellow-100 p-8 px-12">
          <h2 className="text-lg font-semibold text-white">
            Profile Information
          </h2>
          {/* first name and last name */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>
          {/* dob and gender */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="DOB"
                id="DOB"
                className="form-style"
                {...register("DOB", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.DOB}
              />
              {errors.DOB && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.DOB.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>
          {/* contact no and about */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNo" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNo"
                id="contactNo"
                placeholder="Enter Contact Number"
                className="form-style"
                {...register("contactNo", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNo}
              />
              {errors.contactNo && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNo.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
          </div>

          {/* branch room no */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="branch" className="lable-style">
                Branch
              </label>
              <input
                type="text"
                name="branch"
                id="branch"
                placeholder="Enter Branch Name"
                className="form-style"
                {...register("branch", {
                  required: {
                    value: true,
                    message: "Please enter your Branch.",
                  },
                })}
                defaultValue={user?.additionalDetails?.branch}
              />
              {errors.branch && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.branch.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                Room Number
              </label>
              <input
                type="number"
                name="roomNo"
                id="roomNo"
                placeholder="Enter Room No."
                className="form-style"
                {...register("roomNo", { required: true })}
                defaultValue={user?.additionalDetails?.roomNo}
              />
              {errors.roomNo && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Room Number.
                </span>
              )}
            </div>
          </div>
          {/* accno ifsc code */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="AccountNo" className="lable-style">
                Account Number
              </label>
              <input
                type="text"
                name="AccountNo"
                id="AccountNo"
                placeholder="Enter Account Number"
                className="form-style"
                {...register("AccountNo", {
                  required: {
                    value: true,
                    message: "Please enter your Account Number.",
                  },
                  maxLength: { value: 16, message: "Invalid Account Number" },
                  minLength: { value: 16, message: "Invalid Account Number" },
                })}
                defaultValue={user?.additionalDetails?.AccountNo}
              />
              {errors.AccountNo && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.AccountNo.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="IFSC" className="lable-style">
                IFSC
              </label>
              <input
                type="text"
                name="IFSC"
                id="IFSC"
                placeholder="Enter IFSC code"
                className="form-style"
                {...register("IFSC", { required: true })}
                defaultValue={user?.additionalDetails?.IFSC}
              />
              {errors.IFSC && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your IFSC code
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              {/* <label htmlFor="isMessFeePaid" className="lable-style">
                Mess Fee Status
              </label>{" "} */}
              {/* <label htmlFor="paid" className="text-white">
                <input
                  type="radio"
                  id="paid"
                  name="isMessFeePaid"
                  value="Paid"
                  // checked={this.state.selectedOption === "Paid"}
                  // onChange={this.onValueChange}
                  className="p-2 text-white bg-white"
                  {...register("isMessFeePaid", {})}
                  defaultValue={user?.additionalDetails?.isMessFeePaid}
                />
                Paid
              </label> */}
              {/* <label htmlFor="not-paid" className="text-white">
                <input
                  type="radio"
                  id="not-paid"
                  name="isMessFeePaid"
                  value="Not Paid"
                  className="p-2 text-white"
                  // checked={this.state.selectedOption === "Not Paid"}
                  // onChange={this.onValueChange}
                  {...register("isMessFeePaid", {})}
                  defaultValue={user?.additionalDetails?.isMessFeePaid}
                />
                Not Paid
              </label> */}
              {/* {errors.isMessFeePaid && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.isMessFeePaid.message}
                </span>
              )} */}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
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
