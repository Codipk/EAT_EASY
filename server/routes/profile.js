const express = require("express");
const router = express.Router();
const { auth, isChiefWarden } = require("../middleware/auth.middleware");
const {
  getAllUserDetails,
  updateProfile,
  blockUser,
  unblockUser,
  deleteAccount,
  findUserByRegistrationNumber,
  updateProfilePicture
} = require("../controllers/profileController");


router.get("/getAllUserDetails", auth, getAllUserDetails);
router.put("/updateProfile", auth, updateProfile);
router.put("/updateDisplayPicture", auth, updateProfilePicture);
router.post("/blockuser", auth, isChiefWarden, blockUser);
router.delete("/unblockuser", auth, isChiefWarden, unblockUser);
router.delete("/deleteAccount", auth, deleteAccount);
router.get("/getuserbyregistration", auth, findUserByRegistrationNumber)
module.exports = router;
