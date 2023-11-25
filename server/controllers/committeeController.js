const MessCommittee = require('../models/messCommitteSchema');
const User = require('../models/userSchema');
//tempory things
exports.addToMessCommittee = async (req, res) => {
  try {
    //get userDetails
    //change its role
    //add to messCommitte collections
    const { userId } = req.body;
    const userDetails = await User.findByIdAndUpdate(
      userId,
      {
        accountType: "Committee-Member"
      },
      { new: true }
    );

    const committeeInfo = await MessCommittee.findOneAndUpdate(
      { hostel: userDetails.hostel },
      {
        $addToSet: { messMember: userId }
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: 'Added To Committee',
      committeeInfo,
    });


  } catch (error) {
    console.log("Error in adding to mess committee: ", error);
    return res.status(500).json({
      success: false,
      message: "cannnot add to committee, please try again",
      error,
    })
  }
}
exports.removeFromMessCommittee = async (req, res) => {
  try {
    const { userId } = req.body;
    const userDetails = await User.findByIdAndUpdate(
      userId,
      {
        accountType: "Student"
      },
      { new: true }
    );
    const committeeInfo = await MessCommittee.findOneAndUpdate(
      { hostel: userDetails.hostel },
      {
        $pull: { messMember: userId }
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: 'Removed From Committee',
      committeeInfo,
    });


  } catch (error) {
    console.log("Error in creating committee: ", error);
    return res.status(500).json({
      success: false,
      message: "cannnot create committee, please try again",
      error,
    })
  }
}
exports.getMessCommitteDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    // console.log("userDetails in get Committee: ", userDetails)
    const hostelId = userDetails.hostel;
    console.log("hostelId: ", hostelId);
    const committeDetails = await MessCommittee.find({ hostel: hostelId })
      .populate({
        path: "messMember",
        select: "firstName lastName email registrationNumber img",
      });
    return res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      committeDetails,
    })
  } catch (error) {
    console.log("Error in geting committee details: ", error);
    return res.status(500).json({
      success: false,
      message: "cannnot get committee details, please try again",
      error,
    })
  }
}