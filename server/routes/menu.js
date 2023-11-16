// Import the required modules
const express = require('express');
const router = express.Router();

const { isStudent, isChiefWarden, isCommitteeMember, auth, isAbleToEditMenu } = require('../middleware/auth.middleware');
const { addMessMenu, editMessMenu, viewMessMenu } = require('../controllers/menuController');


router.post('/addMenu', auth, isAbleToEditMenu, addMessMenu);
router.put("/editMenu", auth, isAbleToEditMenu, editMessMenu);
router.get("/viewMenu", auth, viewMessMenu);

module.exports = router;