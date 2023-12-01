import React, { useEffect } from "react";

import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../data/navbar-links";
import logo from "../../assets/images/logo.png";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import ProfileDropDown from "../../pages/ProfileDropDown";

import { useState } from "react";
import { ACCOUNT_TYPE } from "../../utils/constants";

import { BsChevronDown } from "react-icons/bs";

function Navbar() {
  //   console.log("Printing base url: ", process.env.REACT_APP_BASE_URL);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-slate-700 ${
        location.pathname !== "/" ? "bg-slate-900" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-yellow-200">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link to={link?.path}>
                  <p
                    className={`${
                      matchRoute(link?.path)
                        ? "text-yellow-300"
                        : "text-slate-200"
                    }`}
                  >
                    {link.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Login./signup/dashboard */}
        <div className="flex gap-x-4 items-center select-none">
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-slate-400 px-[12px] py-[8px] text-white rounded-md">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-slate-400 px-[12px] py-[8px] text-white rounded-md">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
