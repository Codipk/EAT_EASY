<<<<<<< Updated upstream
const express = require('express');
const { auth, isChiefWarden } = require('../middleware/auth.middleware')
const { getAllUserDetails, updateProfile, blockUser, unblockUser, deleteAccount } = require(
  '../controllers/profileController');
const router = express.Router();


router.get('/getAllUserDetails', auth, getAllUserDetails);
router.put('/updateProfile', auth, updateProfile);
router.put('/updateDisplayPicture', auth, updateProfile);
router.post('/blockuser', auth, isChiefWarden, blockUser);
router.delete('/unblockuser', auth, isChiefWarden, unblockUser);
router.delete('/deleteAccount', auth, deleteAccount);
module.exports = router
=======
const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const {
  getAllUserDetails,
  updateProfile,
} = require("../controllers/profileController");
const router = express.Router();

router.get("/getAllUserDetails", auth, getAllUserDetails);
router.put("/updateProfile", auth, updateProfile);
router.put("/updateDisplayPicture", auth, updateProfile);
module.exports = router;
>>>>>>> Stashed changes
