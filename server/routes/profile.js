const express = require('express');
const { auth } = require('../middleware/auth.middleware')
const { getAllUserDetails, updateProfile } = require(
  '../controllers/profileController');
const router = express.Router();


router.get('/getAllUserDetails', auth, getAllUserDetails);
router.put('/updateProfile', auth, updateProfile);
router.put('/updateDisplayPicture', auth, updateProfile);
module.exports = router