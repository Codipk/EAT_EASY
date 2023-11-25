const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userSchema");

//auth
exports.auth = async (req, res, next) => {
  try {
    console.log("BEFORE ToKEN EXTRACTION");
    console.log("request", req.header);

    //extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    console.log("AFTER TOKEN EXTRACTION");
    //if token is missing return res
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is Missing",
      });
    }
    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET); //will return the decoded obj
      console.log("Decoded token is : ", decode);
      req.user = decode; //so that we can use it in isStudent and isAdmin middleware to verify
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying the token",
    });
  }
};
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be verified. Please try again",
    });
  }
};

exports.isChiefWarden = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Chief-Warden") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Chief-Warden only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be verified. Please try again",
    });
  }
};
exports.isCommitteeMember = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Committee-Member") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Committee-Member only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be verified. Please try again",
    });
  }
};
exports.isAccountant = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Accountant") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Accountant only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be verified. Please try again",
    });
  }
};
exports.notStudent = async (req, res, next) => {
  try {
    if (req.user.accountType === "Student") {
      return res.status(401).json({
        success: false,
        message: "Student Cannot Edit mess menu",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be verified. Please try again",
    });
  }
};

exports.isAccountantOrIsWarden = async (req, res, next) => {
  try {
    if (
      !(
        req.user.accountType === "Chief-Warden" ||
        req.user.accountType == "Accountant"
      )
    ) {
      return res.status(401).json({
        success: false,
        message: "This is protected routes for accountants and wardens",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot Mark as Paid. Please try again",
    });
  }
};

exports.isStudentOrCommitteeMember = async (req, res) => {
  try {
    if (req.user.accountType === "Accountants" || req.user.accountType === "Chief-Warden") {
      return res.status(401).json({
        success: false,
        message: "Accountants/Wardens cannot upvote/downvote",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Interal Server Error",
    });
  }
}
