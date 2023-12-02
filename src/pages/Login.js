import React from "react";
import "./../assets/styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../assets/images/BLOG---Login-Screen-SS3.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/images/login.jpg";
import { Facebook, Google, Linkedin, Twitter } from "react-bootstrap-icons";
import Navbar from "../components/common/Navbar";
import { login } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value, "inside handle submit");
    dispatch(login(email, password, navigate));
  };
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* <Navbar /> */}
      <section className="vh-100 bg-image">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sampleimage"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 scroll-smooth">
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3 mt-2">Sign in with</p>
                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1  bg-blue-500"
                  >
                    <Google />
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1  bg-blue-500"
                  >
                    <Twitter />
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1  bg-blue-500"
                  >
                    <Linkedin />
                  </button>
                </div>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    required
                    type="text"
                    name="email"
                    value={email}
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    onChange={handleOnChange}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className="form-control form-control-lg"
                    // style={{
                    //   boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    // }}
                    // className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute -left-22  z-[10] cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  {/* Checkbox */}
                  {/* <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      defaultValue
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div> */}
                  <Link to="/forgot-password">
                    <p className="mt-1 ml-auto max-w-max text-xs text-blue-500">
                      Forgot Password
                    </p>
                  </Link>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary   btn-lg   bg-sky-500"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to="/signup" className="link-danger">
                      <h3>Signup</h3>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2023. All rights reserved.
          </div>
          <div className="flex flex-row gap-2">
            <a href="#!" className="text-white me-4">
              <Facebook />
            </a>
            <a href="#!" className="text-white me-4">
              <Twitter />
            </a>
            <a href="#!" className="text-white me-4">
              <Google />
            </a>
            <a href="#!" className="text-white">
              <Linkedin />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
