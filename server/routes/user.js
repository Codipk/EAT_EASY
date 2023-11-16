const express = require('express');

const router = express.Router();

const {
  sendOtp,
  login,
  signup
} = require("../controllers/authController")



// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOtp)

// Route for Changing the password
// router.post("/changepassword", auth, changePassword)


module.exports = router