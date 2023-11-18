import { RiEditBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../utils/dateFormatter";
import IconBtn from "../common/IconBtn";
import { setHostel, setLoading, setError } from "../../slices/hostelSlice";
import { setUser } from "../../slices/profileSlice";
import { useEffect } from "react";
import { fetchUserDetails } from "../../services/operations/SettingsAPI";
import { ACCOUNT_TYPE } from "../../utils/constants";
export default function MyProfile() {
  const { user, userDetails, loading, error } = useSelector((state) => ({
    user: state.profile,
    userDetails: state.profile.userDetails,
    loading: state.profile.loading,
    error: state.profile.error,
  }));
  // const { user } = useSelector((state) => state.profile);
  console.log("user", user);
  console.log("userDetails", userDetails);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    try {
      dispatch(fetchUserDetails(token));
      setLoading(false);
    } catch (error) {
      console.log("error in fetching user details");
    }
  }, [dispatch, token]);

  return (
    <div className="">
      <h1 className="mb-10 text-3xl font-medium text-purple-300 py-5  px-5">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-yellow-100 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={userDetails?.img}
            alt={`profile-${userDetails?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-white">
              {userDetails?.firstName + " " + userDetails?.lastName}
            </p>
            <p className="text-sm text-white">{userDetails?.email}</p>
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
            userDetails?.additionalDetails?.about
              ? "text-white"
              : "text-slate-300"
          } text-sm font-medium`}
        >
          {userDetails?.additionalDetails?.about ??
            "Write Something About Yourself"}
        </p>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-green-100">First Name</p>
              <p className="text-sm font-medium text-white">
                {userDetails?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-green-100">Email</p>
              <p className="text-sm font-medium text-white">
                {userDetails?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-green-100">Gender</p>
              <p className="text-sm font-medium text-white">
                {userDetails?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-green-100">RoomNo</p>
              <p className="text-sm font-medium text-white">
                {userDetails?.additionalDetails?.roomNo ?? "Your Room No."}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-green-100">Hostel Name</p>
              <p className="text-sm font-medium text-white">
                {userDetails?.hostel?.hostelName ?? "Hostel Name"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-green-100">Last Name</p>
              <p className="text-sm font-medium text-white">
                {userDetails?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-green-100">Phone Number</p>
              <p className="text-sm font-medium text-white">
                {userDetails?.additionalDetails?.contactNo ??
                  "Add Contact Number"}
              </p>
            </div>
            {(user.accountType === ACCOUNT_TYPE.STUDENT ||
              user.accountType === ACCOUNT_TYPE.MESS_COMMITEE) && (
              <div>
                <p className="mb-2 text-sm text-green-100">Branch</p>
                <p className="text-sm font-medium text-white">
                  {userDetails?.additionalDetails?.branch ?? "Add Your Branch"}
                </p>
              </div>
            )}

            <div>
              <p className="mb-2 text-sm font-semibold text-green-100">
                Date Of Birth
              </p>
              <p className="text-sm font-medium text-white">
                {formattedDate(userDetails?.additionalDetails?.DOB) ??
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
            userDetails?.additionalDetails?.IFSC
              ? "text-white"
              : "text-slate-300"
          } text-sm font-medium`}
        >
          IFSC :{" "}
          {userDetails?.additionalDetails?.IFSC ?? "write your IFSC code"}
        </p>
        <p
          className={`${
            userDetails?.additionalDetails?.AccountNo
              ? "text-white"
              : "text-white"
          } text-sm font-medium`}
        >
          AccountNo:{" "}
          {userDetails?.additionalDetails?.AccountNo
            ? userDetails?.additionalDetails?.AccountNo
            : "Write your accno"}
        </p>
        <p
          className={`${
            userDetails?.additionalDetails?.isMessFeePaid
              ? "text-white"
              : "text-white"
          } text-sm font-medium`}
        >
          Mess Fee Status:{" "}
          {userDetails?.additionalDetails?.isMessFeePaid ? "Paid" : "Not Paid"}
        </p>
      </div>
    </div>
  );
}
