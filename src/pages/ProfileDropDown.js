import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/common/ConfirmationModal";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { logout } from "../services/operations/authAPI";

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));
  const [confirmationModal, setConfirmationModal] = useState(null);
  if (!user) return null;

  return (
    <>
      <button className="relative" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-1">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[30px] rounded-full object-cover"
          />
          <AiOutlineCaretDown className="text-sm text-white" />
        </div>
        {open && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-slate-700 bg-white"
            ref={ref}
          >
            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-slate-700 hover:text-yellow-100">
                <VscDashboard className="text-lg" />
                Dashboard
              </div>
            </Link>
            {/* <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div> */}
            <div>
              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "You will be logged out of your account.",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
                className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-blue-900 hover:bg-slate-500 hover:text-yellow-200"
              >
                <div className="flex items-center gap-x-2">
                  <VscSignOut className="text-lg text-blue-950" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </button>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
