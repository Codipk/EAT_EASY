// Import the required modules
const express = require('express');
const router = express.Router();

const { isStudent, isChiefWarden, isCommitteeMember, auth, notStudent } = require('../middleware/auth.middleware');
const { addMessMenu, editMessMenu, viewMessMenu } = require('../controllers/menuController');
const { getNutritionDetails } = require('../controllers/menuController');


router.post('/addMenu', auth, notStudent, addMessMenu);
router.put("/editMenu", auth, notStudent, editMessMenu);
router.get("/viewMenu", auth, viewMessMenu);
router.get("/getnutrition", auth, getNutritionDetails);
module.exports = router;


