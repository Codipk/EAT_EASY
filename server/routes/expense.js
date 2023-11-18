// Import the required modules
const express = require('express');
const router = express.Router();
//import middleware -> 
const { auth, isAccountant } = require('../middleware/auth.middleware');
const { addExpense, editExpense, getTotaltExpense, deleteExpense, getAllDetailsOfExpenseHostelWise,getExpenseInRange, getExpenseInRangeAndTotal } = require('../controllers/dailyExpenseController');

//import controllers
router.post("/addDailyExpense",auth,isAccountant,addExpense);
router.put("/updateDailyExpense",auth,isAccountant,editExpense);
router.get("/getTotalExpense",auth,isAccountant,getTotaltExpense);
router.delete("/deleteExpense",auth,isAccountant,deleteExpense);
router.get("/getAllDetailsOfExpenseHostelWise", auth, isAccountant,getAllDetailsOfExpenseHostelWise);
router.get("/getExpenseInRangeAndTotalHostelWise", auth, isAccountant,getExpenseInRangeAndTotal);

module.exports = router;