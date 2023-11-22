const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTPSchema");
const Hostel = require("../models/hostelSchema");
const AdditionalDetails = require("../models/additionalDetailSchema");
const otpGenerator = require("otp-generator");
const { passwordUpdated } = require("../mailTemplates/passwordUpdated");
const { mailSender } = require("../utils/mailSender");
exports.sendOtp = async (req, res) => {
  /*
      1. fetch email from req.body
      2. email Validation
      3. create OTP
      4. create Entry in DB
      5. return response
*/
  try {
    //1. fetch email from req.body
    const { email } = req.body;

    // 2. check whether user is registered or not
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User Already Registered",
      });
    }
    // 3. create OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP is : ", otp);
    //check whether it is unique or not

    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    // 4. create Entry in DB
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Saved in DB", otpBody);
    // 5. return response
    return res.status(200).json({
      success: true,
      message: "otp sent successfully",
      otpBody,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.signup = async (req, res) => {
  /*
    1. Fetch data from req.body
    2. Perform Validation -> all fields filled
    3. check password and confirm password matches?
    4. Check user Already Exit?
    5 . find most recent otp from the database
    6. Validate OTP
    7. hash the password
    8. create user and additionalDetails entry in db
    //insertUserId to hostel.students
    9. return response

  */
  try {
    // 1. Fetch data from req.body
    const {
      firstName,
      lastName,
      registrationNumber,
      email,
      hostelName,
      password,
      confirmPassword,
      otp,
    } = req.body;
    // 2. Perform Validation -> all fields filled
    if (
      (!firstName ||
        !lastName ||
        !registrationNumber ||
        !email ||
        !hostelName ||
        !password ||
        !confirmPassword,
      !otp)
    ) {
      return res.status(403).json({
        success: false,
        message: "All Fields Required",
      });
    }
    // 3. check password and confirm password matches?
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Passoword didn't match",
      });
    }
    // 4. Check user Already Exit?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered",
      });
    }
    // 5 . find most recent otp from the database
    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("Fetched otp form db is : ", recentOtp);
    // 6. Validate OTP
    if (recentOtp == null || recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP Not Found",
      });
    }
    // console.log("Executed till here")
    else if (otp != recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTPs",
      });
    }
    // 7. hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error inn hashing Password",
      });
    }
    // for student to be of some hostel hostelName should be
    //present in our database
    let hostel = await Hostel.findOne({ hostelName });
    if (!hostel) {
      return res.status(400).json({
        success: false,
        message: "Hostel does not exist",
      });
    }

    //creating addtionalDetails with null
    const additionalDetails = await AdditionalDetails.create({
      gender: null,
      DOB: null,
      about: null,
      AccountNo: null,
      IFSC: null,
      roomNo: null,
      contactNo: null,
      branch: null,
    });
    // 8. create user and additionalDetails entry in db
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      registrationNumber,
      hostel: hostel._id,
      additionalDetails: additionalDetails._id,
      img: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    hostel.students.push(user._id);
    await hostel.save();
    // 9. return response
    return res.status(200).json({
      success: true,
      message: "User is Registered Successfully",
      user,
    });
  } catch (error) {
    console.log("Error in Registration : ", error);
    return res.status(500).json({
      success: false,
      message: "User Can not be Registered. Please try again ",
    });
  }
};

//LogIn
exports.login = async (req, res) => {
  //Steps ->
  /*
    1. fetch data from req.body
    2. perform validation
    3. check user registered or not
    4. generate JWT tokens after password matching
    5. create Cookie and send Response
  */
  try {
    //1. fetch data from req.body
    const { email, password } = req.body;

    //2.Validate data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are neccessary",
      });
    }

    //3. check user if AlreadyExist
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered . Please SignUp firstly",
      });
    }

    //4. generate JWT tokens after password matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      //5. create Cookie and send Response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3days
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in Successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log("Error in LogIn : ", error);
    return res.status(500).json({
      success: false,
      message: "LogIn failure. Please Try Again",
    });
  }
};

//change password
exports.changePassword = async (req, res) => {
  //steps->>>
  //1.get data from req.body
  //2.get oldPassword , newpassword , confirmNewPassword
  //3. perfom validation
  //4. update password in DB
  //5. send Mail -> changed password
  //6. return response
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    console.log(userDetails);
    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res.status(401).json({
        success: false,
        message: "The password is incorrect",
      });
    }

    //Match new password and confirm new password
    if (newPassword !== confirmNewPassword) {
      // If new password and confirm new password do not match, return a 400 (Bad Request) error
      return res.status(400).json({
        success: false,
        message: "The password and confirm password does not match",
      });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password Changed",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  //get email from bdoy
  //check usr for this email , email validation
  //generate token
  //update user by adding token and expiration time
  //create url
  //send mail containing url
  //return response

  try {
    //get email from bdoy
    const { email } = req.body;
    console.log(email);
    //check usr for this email , email validation
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.json({
        success: false,
        message: "User is not Registered with this email",
      });
    }
    //generate token -> this token will be inserted in DB and then using this token
    //we will get the user and then reset the password
    const token = crypto.randomBytes(20).toString("hex");
    //converts hexadecimal to string
    //for example "36b8f84d-df4e-4d49-b662-bcde71a8764f"
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000, //5 min
      },
      { new: true }
    ); //with this new:true -> updated data is returned

    // we are running our frontend on port 3000 so we use 3000 in url
    const frontend = process.env.FRONTEND_LINK;
    console.log("DETAILS", updatedDetails);
    //create url
    const url = `${frontend}/update-password/${token}`;

    //send mail containing url
    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    //return response
    return res.status(200).json({
      success: true,
      message:
        "Email sent successfully . Please check Email and Change password",
      token,
    });
  } catch (error) {
    console.log("Error in ResetPassword Token : ", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went Wrong in ResetPasswordToken",
    });
  }
};

//resetPassword
exports.resetPassword = async (req, res) => {
  try {
    //fetch data
    //validation
    //get user details
    //if no entry -> invalid token
    //token time check
    //hash password
    //password update
    //return response

    //fetch data
    const { password, confirmPassword, token } = req.body; //token is inserted in body by frontend
    //validation
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and Confrim Password Doesn't match ",
      });
    }
    console.log("token is : ", token);
    //get user details
    const userDetails = await User.findOne({ token: token });
    //if no entry -> invalid token
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is invalid",
      });
    }
    //token time check
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }
    //hash password
    const encryptedPassword = await bcrypt.hash(password, 10);
    //password update
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    ); //with this new:true -> updated data is returned

    //return response
    return res.status(200).json({
      success: true,
      message: "Password reset Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
};
