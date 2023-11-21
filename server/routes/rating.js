const express = require('express');
const { isStudent, auth } = require('../middleware/auth.middleware');
const { createRating, findAvgRating } = require('../controllers/ratingControllers');
const router = express.Router();


router.post('/createrating', auth, isStudent, createRating);
router.get('/getavgratingmealwise', auth, isStudent, findAvgRating);
module.exports = router;