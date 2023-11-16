// Import the required modules
const express = require('express');
const { isStudent, isChiefWarden, isCommitteeMember, auth } = require('../middleware/auth.middleware');
const { createCommittee } = require('../controllers/committee')
const router = express.Router();


router.post("/createCommittee", auth, isChiefWarden, createCommittee);


module.exports = router;