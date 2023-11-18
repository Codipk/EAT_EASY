import { ACCOUNT_TYPE } from "../../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 3,
    name: "My Complaints",
    path: "/dashboard/my-complaint",
    type: ACCOUNT_TYPE.STUDENT,
    //this is for student a and mess commitee
    icon: "VscVm",
  },
  {
    id: 3,
    name: "My Complaints",
    path: "/dashboard/my-complaint",
    type: ACCOUNT_TYPE.MESS_COMMITEE,
    //this is for student a and mess commitee
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Complaint",
    path: "/dashboard/add-complaint",
    type: ACCOUNT_TYPE.STUDENT || ACCOUNT_TYPE.MESS_COMMITEE,
    // for student
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "All Complaints",
    path: "/dashboard/all-complaints",
    // type:
    //   ACCOUNT_TYPE.STUDENT ||
    //   ACCOUNT_TYPE.MESS_COMMITEE ||
    //   ACCOUNT_TYPE.WARDEN ||
    //   ACCOUNT_TYPE.ACCOUNTANT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Mess Menu",
    path: "/dashboard/mess-menu",
    // type: ACCOUNT_TYPE.STUDENT,
    // type:
    //   ACCOUNT_TYPE.STUDENT ||
    //   ACCOUNT_TYPE.MESS_COMMITEE ||
    //   ACCOUNT_TYPE.ACCOUNTANT,
    icon: "VscHistory",
  },
  // {
  //   id: 7,
  //   name: "Edit Mess Menu",
  //   path: "/dashboard/mess-menu/mess-edit-menu",
  //   // type:
  //   //   ACCOUNT_TYPE.MESS_COMMITEE ||
  //   //   ACCOUNT_TYPE.WARDEN ||
  //   //   ACCOUNT_TYPE.ACCOUNTANT,
  //   icon: "VscHistory",
  // },
  {
    id: 8,
    name: "All Expenses",
    path: "/dashboard/all-expenses",
    type: ACCOUNT_TYPE.ACCOUNTANT,
    icon: "VscHistory",
  },
  {
    id: 9,
    name: "Add Expenses",
    path: "/dashboard/add-expenses",
    type: ACCOUNT_TYPE.ACCOUNTANT,
    icon: "VscAdd",
  },
];
