const User = require('../models/userSchema');
const DailyExpense = require('../models/dailyExpensechema');



//add
exports.addExpense = async (req, res) => {
  try {
    // Get hostel id
    //fetch data from req.body
    // vailidation on product and price
    // create entry in db
    // return response

    const userDetails = await User.findById(req.user.id);
    const hostelId = userDetails.hostel;
    const {
      productName, productDescription, productQuantity, productPrice
    } = req.body;
    if (!productName || !productPrice) {
      return res.status(403).json({
        success: false,
        message: 'Product Name and Price are Required',
      });
    }
    const expense = await DailyExpense.create({
      hostel: hostelId,
      productName,
      productDescription,
      productQuantity,
      productPrice
    });
    return res.status(200).json({
      sucess: true,
      message: 'Daily Expense Created',
      expense,
    });


  } catch (error) {
    console.log("error in adding expense: ", error);
    return res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
      error,
    });
  }
}
//edit
exports.editExpense = async (req, res) => {
  try {
    //find expense id
    //fetch details from req.body
    //findbyid and update expense 
    //return response

    const { expenseId, productName, productDescription, productQuantity, productPrice } = req.body;
    if (!productName || !productPrice) {
      return res.status(403).json({
        success: false,
        message: 'Product Name and Price are Required',
      });
    }
    const updatedExpense = await DailyExpense.findByIdAndUpdate(
      expenseId,
      {
        productName,
        productDescription,
        productQuantity,
        productPrice
      }, { new: true }
    );
    return res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      updatedExpense,
    });
  } catch (error) {
    console.log("error in editing expense: ", error);
    return res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
      error,
    });
  }
}





//getAllExpense
exports.getAllDetailsOfExpenseHostelWise = async (req, res) => {
  try {
    // fetch hostelId
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    const hostelId = userDetails.hostel;
    console.log(hostelId)
    // Get all Expense from DailyExpense collection
    const allExpense = await DailyExpense.find({ hostel: hostelId });
    //return respomse
    return res.status(200).json({
      success: true,
      message: 'Expense Fetched',
      allExpense,
    });
  } catch (error) {
    console.log("error in fidning hostelwise expense: ", error);
    return res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
      error,
    });
  }
}


//delete
exports.deleteExpense = async (req, res) => {
  try {
    // fetch expenseId req.body
    const { expenseId } = req.body;
    // find and delete expenseId from db
    const deletedExpense = await DailyExpense.findByIdAndDelete(expenseId);
    // return response
    return res.status(200).json({
      success: true,
      message: 'complaint is successfully deleted',
      deletedExpense,
    });



  } catch (error) {
    console.log("error in deleting expense: ", error);
    return res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
      error,
    });
  }
}




//getTotalExpense of hostel till now 
exports.getTotaltExpense = async (req, res) => {
  try {
    // fetch hostel Id 
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    const hostelId = userDetails.hostel;
    console.log(hostelId)
    // console.log(DailyExpense.hostel)
    const totalExpense = await DailyExpense.aggregate([
      { $match: { "hostel": hostelId } },

      {
        $group: {
          _id: null,
          total: { $sum: '$productPrice' }
        }
      }]);
    console.log(totalExpense)
    let total = totalExpense.length > 0 ? totalExpense[0].total : 0;
    return res.status(200).json({
      success: true,
      message: 'Total Expense Fetched Successfully',
      total,
    });
  } catch (error) {
    console.log("error in fetching totals expense: ", error);
    return res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
      error,
    });
  }
}

//getExpenseInRangeAndTotal of hostel till now 

exports.getExpenseInRangeAndTotal = async (req, res) => {
  try {
    // fetch hostel Id 
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    const hostelId = userDetails.hostel;
    // console.log(hostelId)
    const {
      startDate, endDate
    } = req.body;

    console.log(startDate)

    const totalExpense = await DailyExpense.aggregate([
      {
        $match: {
          "hostel": hostelId,
          $expr: {
            $and: [
              { $gte: [{ $dateToString: { format: "%Y-%m-%d", date: "$dateOfExpense" } }, startDate] },
              { $lte: [{ $dateToString: { format: "%Y-%m-%d", date: "$dateOfExpense" } }, endDate] }
            ]
          }
        }
      },

      {
        $group: {
          _id: null,
          total: { $sum: '$productPrice' }
        }
      }]);

    const ExpenseInRange = await DailyExpense.find({
      hostel: hostelId,
      $expr: {
        $and: [
          { $gte: [{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, startDate] },
          { $lte: [{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, endDate] }
        ]
      }
    });
    console.log(totalExpense)
    let total = totalExpense.length > 0 ? totalExpense[0].total : 0;
    return res.status(200).json({
      success: true,
      message: 'Total Expense Fetched Successfully',
      total,
      ExpenseInRange,
    });
  } catch (error) {
    console.log("error in fetching totals expense: ", error);
    return res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
      error,
    });
  }
}


