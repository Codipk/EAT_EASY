const additionDetails = require('../models/additionalDetailSchema');
const User = require('../models/userSchema');
const BlockedUser = require('../models/blockedUserSchema');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

exports.updateProfile = async (req, res) => {
  //getRequired Data 
  //get userId
  //validation
  //find profile
  //update profile
  //return response
  try {
    //fetch details
    const { gender, DOB, AccountNo, IFSC, contactNo, branch, roomNo, about } = req.body;
    const id = req.user.id;
    //find profile by id
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User is not authorised",
      });
    }
    console.log("Type of userDetails ", typeof userDetails);
    console.log("UserDetails : ", userDetails);
    const profile = await additionDetails.findById(userDetails.additionalDetails);
    console.log("profile  : ", profile);

    //edit changes
    profile.gender = gender;
    profile.DOB = DOB;
    profile.AccountNo = AccountNo;
    profile.contactNo = contactNo;
    profile.IFSC = IFSC;
    profile.branch = branch;
    profile.roomNo = roomNo;
    profile.about = about;
    await profile.save();
    console.log("profile after updating : ", profile);
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      profile,
    })
  } catch (error) {
    console.log("not able to update profile", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }

}
exports.updateProfilePicture = async (req, res) => {
  try {
    console.log("Req : ", req);
    const profilePic = req.files.profilePic;
    if (!profilePic) {
      return res.status(403).json({
        success: true,
        message: "Profile pic cannot be null",
      });
    }
    const userId = req.user.id;
    const imgDetails = await uploadImageToCloudinary(profilePic, process.env.FOLDER_NAME);
    if (!imgDetails) {
      return res.status(500).json({
        success: false,
        message: 'Cannot upload img to cloudinary, Try again!',
      })
    }
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { img: imgDetails.secure_url },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: 'Profile Pic Uploaded Successfully',
    });
  } catch (error) {

  }
}

exports.getAllUserDetails = async (req, res) => {
  try {
    console.log(req.user);
    // const { id } = req.body;
    const id = req.user.id

    const userDetails = await User.findById(id)
      .populate({
        path: "hostel",
        populate: {
          path: "menu messCommittee",
          select: "-hostel",
          // populate: {
          //   path: "messManager",
          //   select: "-hostel"
          // }
        },
      })
      .populate("additionalDetails")
      .populate("complaints")
      .exec();
    return res.status(200).json({
      success: true,
      message: "User Details Fetched Successfully",
      userDetails,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      messagee: "Internal Server Error",
      error,
    })
  }

}
//not tested yet
exports.blockUser = async (req, res) => {
  try {
    //1. fetch userDetails
    //check is already blocked -> otherwise multiple entry will be created
    //2. block userBy its emailId
    // console.log(req.body);
    const userId = req.body;
    const userDetails = await BlockedUser.find({ email: userId.email });
    if (userDetails) {
      return res.status(403).json({

      })
    }
    const blockedUserDetails = await BlockedUser.create(userId.email);
    return res.status(200).json({
      success: true,
      message: 'User blocked Successfully',
      blockedUserDetails,
    })
  } catch (error) {
    console.log("Error in Blocking user", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
}

exports.unblockUser = async (req, res) => {
  const userId = req.body;
  const blockedUserDetails = await BlockedUser.findByIdAndDelete(
    { email: userId.email }
  );
}