// import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  // {
  //   id: 2,
  //   name: "Dashboard",
  //   path: "/dashboard/instructor",
  //   // type: ACCOUNT_TYPE.INSTRUCTOR,
  //   icon: "VscDashboard",
  // },
  {
    id: 3,
    name: "My Complaints",
    path: "/dashboard/my-complaint",
    // type: ACCOUNT_TYPE.INSTRUCTOR,
    //this is for student
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Complaint",
    path: "/dashboard/add-complaint",
    // type: ACCOUNT_TYPE.INSTRUCTOR,
    // for student
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "All Complaints",
    path: "/dashboard/all-complaints",
    // type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Mess Menu",
    path: "/dashboard/mess-menu",
    // type: ACCOUNT_TYPE.STUDENT,
    icon: "VscHistory",
  },
];
