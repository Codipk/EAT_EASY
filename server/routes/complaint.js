// Import the required modules
const express = require('express');
const router = express.Router();

//import middleware -> 

const { auth, isStudent, isChiefWarden, isCommitteeMember, isAccountant } = require('../middleware/auth.middleware');

//import controllers
const { createComplaint, getAllComplaints, getResolvedComplaints, getUnresolvedComplaints, myComplaints, likeComplaints, dislikeComplaints, deleteComplaints } = require('../controllers/complaintController');



router.post('/createComplaint', auth, isStudent, createComplaint);
router.get('/getAllComplaints', auth, getAllComplaints);
router.get('/getResolvedComplaints', auth, getResolvedComplaints);
router.get('/getUnresolvedComplaints', auth, getUnresolvedComplaints);
router.get('/myComplaints', auth, myComplaints);
router.delete('/deleteComplaint', auth, deleteComplaints);
router.put("/updateUpvote", auth,isStudent, likeComplaints);
router.put("/updateDownvote", auth,isStudent, dislikeComplaints);
module.exports = router;