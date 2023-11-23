// Import the required modules
const express = require('express');
const router = express.Router();

//import middleware -> 

const { auth, isStudent, isChiefWarden, isCommitteeMember, isAccountant, notStudent } = require('../middleware/auth.middleware');

//import controllers

const { createComplaint, getAllComplaints, getResolvedComplaints, getUnresolvedComplaints, myComplaints, likeComplaints, dislikeComplaints, deleteComplaints, resolveComplaint, commentsOnComplaints, getComplaintByMostVotes, getMostRecentsComplaints } = require('../controllers/complaintController');



router.post('/createComplaint', auth, isStudent, createComplaint);
router.get('/getAllComplaints', auth, getAllComplaints);
router.get('/getResolvedComplaints', auth, getResolvedComplaints);
router.get('/getUnresolvedComplaints', auth, getUnresolvedComplaints);
router.get('/myComplaints', auth, myComplaints);
router.delete('/deleteComplaint', auth, deleteComplaints);
router.put("/updateUpvote", auth, isStudent, likeComplaints);
router.put("/updateDownvote", auth, isStudent, dislikeComplaints);
router.put("/resolvecomplaint", auth, notStudent, resolveComplaint);
router.put("/commentOnComplaint", auth, isStudent, commentsOnComplaints);
router.get("/getByMostVotes", auth, getComplaintByMostVotes);
router.get("/getMostRecentComplaints", auth, getMostRecentsComplaints)

module.exports = router;