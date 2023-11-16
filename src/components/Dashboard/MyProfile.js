import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../utils/dateFormatter";
import IconBtn from "../common/IconBtn";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  console.log("inside myprofile", user.additionalDetails);

  // const user = {
  //   image: null,
  //   firstName: "dipti",
  //   lastName: "kumari",
  //   email: "diptiku2002@gmail.com",

  //   additionalDetails: {
  //     IFSC_code: "SBI0098",
  //     Account_no: "323049123",
  //     contactNo: 94284204281,
  //     gender: "Female",
  //     isMessFeePaid: "YES",
  //     DOB: "04-10-2002",
  //     roomNo: 19,
  //   },
  // };

  const navigate = useNavigate();

  return (
    <div className="">
      <h1 className="mb-10 text-3xl font-medium text-purple-300 py-5  px-5">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-yellow-100 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-white">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-white">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-yellow-200 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-white">About</p>

          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about ? "text-white" : "text-slate-300"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-green-100">First Name</p>
              <p className="text-sm font-medium text-white">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-green-100">Email</p>
              <p className="text-sm font-medium text-white">{user?.email}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-green-100">Gender</p>
              <p className="text-sm font-medium text-white">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-green-100">RoomNo</p>
              <p className="text-sm font-medium text-white">
                {user?.additionalDetails?.roomNo ?? "Your Room No."}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-green-100">Hostel Name</p>
              <p className="text-sm font-medium text-white">
                {user?.hostel ?? "Hostel Name"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-green-100">Last Name</p>
              <p className="text-sm font-medium text-white">{user?.lastName}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-green-100">Phone Number</p>
              <p className="text-sm font-medium text-white">
                {user?.additionalDetails?.contactNo ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-green-100">Branch</p>
              <p className="text-sm font-medium text-white">
                {user?.additionalDetails?.branch ?? "Add Your Branch"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-green-100">
                Date Of Birth
              </p>
              <p className="text-sm font-medium text-white">
                {formattedDate(user?.additionalDetails?.DOB) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-white">Personal Details</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.IFSC ? "text-white" : "text-slate-300"
          } text-sm font-medium`}
        >
          IFSC : {user.additionalDetails.IFSC ?? "write your IFSC code"}
        </p>
        <p
          className={`${
            user?.additionalDetails?.AccountNo ? "text-white" : "text-white"
          } text-sm font-medium`}
        >
          AccountNo:{" "}
          {user?.additionalDetails?.AccountNo
            ? user?.additionalDetails?.AccountNo
            : "Write your accno"}
        </p>
        <p
          className={`${
            user?.additionalDetails?.isMessFeePaid ? "text-white" : "text-white"
          } text-sm font-medium`}
        >
          Mess Fee Status:{" "}
          {user?.additionalDetails?.isMessFeePaid
            ? user?.additionalDetails?.isMessFeePaid
            : "Not Paid"}
        </p>
      </div>
    </div>
  );
}
