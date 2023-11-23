// Import the required modules
const express = require('express');
const { isStudent, isChiefWarden, isCommitteeMember, auth } = require('../middleware/auth.middleware');
const { addToMessCommittee, removeFromMessCommittee, getMessCommitteDetails } = require('../controllers/committeeController')
const router = express.Router();


router.put("/addtocommittee", auth, isChiefWarden, addToMessCommittee);
router.put("/removefromcommittee", auth, isChiefWarden, removeFromMessCommittee);
router.get("/getcommitteedetails", auth, isChiefWarden, getMessCommitteDetails)
module.exports = router;