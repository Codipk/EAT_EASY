// Import the required modules
const express = require('express');
const router = express.Router();

//import middleware -> 

const { auth, isStudent, isChiefWarden, isCommitteeMember, isAccountant, notStudent } = require('../middleware/auth.middleware');

//import controllers


const { createComplaint, getAllComplaints, getResolvedComplaints, getUnresolvedComplaints, myComplaints, likeComplaints, dislikeComplaints, deleteComplaints, resolveComplaint, commentsOnComplaints, getComplaintByMostVotes, getMostRecentsComplaints, getComplaintById } = require('../controllers/complaintController');
const { createComment, getComment } = require('../controllers/commentController');



router.post('/createComplaint', auth, isStudent, createComplaint);
router.get('/getAllComplaints', auth, getAllComplaints);
router.get('/getResolvedComplaints', auth, getResolvedComplaints);
router.get('/getUnresolvedComplaints', auth, getUnresolvedComplaints);
router.get('/myComplaints', auth, myComplaints);
router.get('/getComplaintById/:complaintId', auth, getComplaintById);
router.delete('/deleteComplaint', auth, deleteComplaints);
router.put("/updateUpvote", auth, isStudent, likeComplaints);
router.put("/updateDownvote", auth, isStudent, dislikeComplaints);
router.put("/resolvecomplaint", auth, notStudent, resolveComplaint);

router.get("/getByMostVotes", auth, getComplaintByMostVotes);
router.get("/getMostRecentComplaints", auth, getMostRecentsComplaints)

router.post('/:complaintId/createComment', auth, createComment)
router.get('/:complaintId/getComment', auth, getComment)


module.exports = router;