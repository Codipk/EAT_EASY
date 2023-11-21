// Import the required modules
const express = require('express');
const router = express.Router();
//import middleware -> 

const { auth, isAccountant } = require('../middleware/auth.middleware');

const { 

      addExpense, 
      editExpense,
      getTotaltExpense,
      deleteExpense,
      getAllDetailsOfExpenseHostelWise,
      getExpenseInRangeAndTotal,
      getAllExpenseCategoryWiseAndTotal,
      getExpenseInRangeCategoryWiseAndTotal,
      getExpenseInRangeProductWiseAndTotal ,
      getAllExpenseProductWiseAndTotal

    } = require('../controllers/dailyExpenseController');

//import controllers
router.post("/addDailyExpense",auth,isAccountant,addExpense);

router.put("/updateDailyExpense",auth,isAccountant,editExpense);

router.get("/getTotalExpense",auth,isAccountant,getTotaltExpense);

router.delete("/deleteExpense",auth,isAccountant,deleteExpense);

router.get("/getAllDetailsOfExpenseHostelWise", auth, isAccountant,getAllDetailsOfExpenseHostelWise);

router.get("/getExpenseInRangeAndTotalHostelWise", auth, isAccountant,getExpenseInRangeAndTotal);

router.get("/getAllExpenseCategoryWiseAndTotal",auth,isAccountant,getAllExpenseCategoryWiseAndTotal);

router.get("/getExpenseInRangeCategoryWiseAndTotal",auth,isAccountant,getExpenseInRangeCategoryWiseAndTotal);

router.get("/getExpenseInRangeProductWiseAndTotal",auth,isAccountant,getExpenseInRangeProductWiseAndTotal);

router.get("/getAllExpenseProductWiseAndTotal",auth,isAccountant,getAllExpenseProductWiseAndTotal);

module.exports = router;