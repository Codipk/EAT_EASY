import React from "react";
import "../../assets/styles/nav.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../../pages/ProfileDropDown";
// import { apiConnector } from "../../services/apiconnector";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  // const { user } = useSelector((state) => state.profile);
  return (
    <div>
      <div>
        <header className="header">
          <nav className="navbar">
            <h2 className="logo">
              <Link to="/">EAT EASY</Link>
            </h2>
            <input type="checkbox" id="menu-toggle" />
            <label htmlFor="menu-toggle" id="hamburger-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </label>
            <ul className="links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/aboutUs">
                  <h3 className="font-semibold">About Us</h3>
                </Link>
              </li>
              {/* <li>
                <Link to="/Services">
                  <h3 className="font-semibold">Services</h3>
                </Link>
              </li> */}
              {/* <li>
                <a href="/">Portfolio</a>
              </li> */}
              <li>
                <Link to="/contactUs">
                  <h3 className="font-semibold">Contact Us</h3>
                </Link>
              </li>
            </ul>
            <div className="buttons">
              {token !== null && (
                <Link to="/dashboard/cart" className="relative">
                  {/* <AiOutlineShoppingCart className="text-2xl text-richblack-100" /> */}
                  {
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                      Dashboard
                    </span>
                  }
                </Link>
              )}
              {token === null && (
                <Link to="/login" className="signin">
                  Login
                </Link>
              )}
              {token === null && (
                <Link to="/signup" className="signup">
                  Sign Up
                </Link>
              )}
              {token !== null && <ProfileDropDown />}
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
