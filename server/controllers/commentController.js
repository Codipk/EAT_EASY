const User = require("../models/userSchema");
const Comment = require("../models/commentSchema");

// create comment
exports.createComment = async (req, res) => {
  console.log("req in commmnet controller", req);

  try {
    const complaintId = req.params.complaintId;
    console.log(complaintId);
    const { comment } = req.body;
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    const userName = userDetails.firstName + " " + userDetails.lastName;
    console.log("userName: ", userName);

    if (complaintId) {
      const createComment = await Comment.create({
        text: comment,
        userName: userName ? userName : "admin",
        complaintId,
        userId,
      });
      return res.status(200).json({
        success: true,
        message: "Commented Successfully",
        createComment,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "complaint Id not found in create complaints",
      });
    }
  } catch (error) {
    console.log("error in creating comments ", error);
    return res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// get comments

exports.getComment = async (req, res) => {
  try {
    const complaintId = req.params.complaintId;
    console.log(complaintId);

    if (complaintId) {
      const comment = await Comment.find({
        complaintId: complaintId,
      }).sort({ createdAt: "desc" });
      return res.status(200).json({
        success: true,
        message: "Getting Comment Successfully",
        comment,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "complaint Id not found in get comments",
      });
    }
  } catch (error) {
    console.log("error in Geting comments ", error);
    return res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
      error,
    });
  }
};
