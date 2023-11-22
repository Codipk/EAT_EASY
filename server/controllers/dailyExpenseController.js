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
    let {
      productName, productDescription, productQuantity, productPrice, dateOfExpense,productCategory
    } = req.body;
    if (!productName || !productPrice) {
      return res.status(403).json({
        success: false,
        message: 'Product Name and Price are Required',
      });
    }
    productName = productName.toLowerCase();
    let expense = await DailyExpense.create({
      hostel: hostelId,
      productName,
      productDescription,
      productQuantity,
      productPrice,
      dateOfExpense,
      productCategory
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

    const { expenseId, productName, productDescription, productQuantity, productPrice,dateOfExpense,productCategory } = req.body;
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
        productPrice,
        dateOfExpense,
        productCategory
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

//get expenseById
exports.getExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const expense = await DailyExpense.findById(expenseId);
    if (!expense) {
      return res.status(200).json({
        success: true,
        message: 'No such expense Exist',
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Expense Fetched Successfully',
      expense,
    });
  } catch (error) {
    console.log("Error in Fetching expense by id ", error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error,
    });
  }



}



//getAllExpense

exports.getAllDetailsOfExpense = async (req, res) => {
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




//getAllExpenseProductWiseAndTotal of hostel till now

exports.getAllExpenseProductWiseAndTotal = async (req, res) => {
  try {
    // fetch hostel Id 
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    const hostelId = userDetails.hostel;
    // console.log(hostelId)
    const {
      productName, 
    } = req.query;

    

    const totalExpense = await DailyExpense.aggregate([
      {
        $match: {
          "hostel": hostelId,
          "productName" : productName,
          
        }
      },

      {
        $group: {
          _id: null,
          total: { $sum: '$productPrice' }
        }
      }]);

    const productNameWiseExpense = await DailyExpense.find({
      hostel: hostelId,
      productName : productName,
      
    });
    console.log(totalExpense)
    let total = totalExpense.length > 0 ? totalExpense[0].total : 0;
    return res.status(200).json({
      success: true,
      message: 'Total Expense Fetched Successfully',
      total,
      productNameWiseExpense,
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
    } = req.query;

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
          { $gte: [{ $dateToString: { format: "%Y-%m-%d", date: "$dateOfExpense" } }, startDate] },
          { $lte: [{ $dateToString: { format: "%Y-%m-%d", date: "$dateOfExpense" } }, endDate] }
        ]
      }
    });
    console.log(ExpenseInRange)
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




//getAllExpenseCategoryWiseAndTotal of hostel till now

exports.getAllExpenseCategoryWiseAndTotal = async (req, res) => {
  try {
    // fetch hostel Id 
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    const hostelId = userDetails.hostel;
    // console.log(hostelId)
    const {
      productCategory
    } = req.query;

    

    const totalExpense = await DailyExpense.aggregate([
      {
        $match: {
          "hostel": hostelId,
          "productCategory" : productCategory
        }
      },

      {
        $group: {
          _id: null,
          total: { $sum: '$productPrice' }
        }
      }]);

    const categoryWiseExpense = await DailyExpense.find({
      hostel: hostelId,
      productCategory : productCategory,
    });
    console.log(totalExpense)
    let total = totalExpense.length > 0 ? totalExpense[0].total : 0;
    return res.status(200).json({
      success: true,
      message: 'Total Expense Fetched Successfully',
      total,
      categoryWiseExpense,
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




//getExpenseInRangeCategoryWiseAndTotal of hostel till now

exports.getExpenseInRangeCategoryWiseAndTotal = async (req, res) => {
  try {
    // fetch hostel Id 
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    const hostelId = userDetails.hostel;
     // console.log(hostelId)

     // Extracting query parameters
     const { 
      startDate, endDate, productCategory
     } = req.query;

    
    

    const totalExpense = await DailyExpense.aggregate([
      {
        $match: {
          "hostel": hostelId,
          "productCategory" : productCategory,
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

    const categoryWiseExpense = await DailyExpense.find({
      hostel: hostelId,
      productCategory : productCategory,
      $expr: {
        $and: [
          { $gte: [{ $dateToString: { format: "%Y-%m-%d", date: "$dateOfExpense" } }, startDate] },
          { $lte: [{ $dateToString: { format: "%Y-%m-%d", date: "$dateOfExpense" } }, endDate] }
        ]
      }
    });
    console.log(totalExpense)
    let total = totalExpense.length > 0 ? totalExpense[0].total : 0;
    return res.status(200).json({
      success: true,
      message: 'Total Expense Fetched Successfully',
      total,
      categoryWiseExpense,
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



//getExpenseInRangeProductWiseAndTotal of hostel till now

exports.getExpenseInRangeProductWiseAndTotal = async (req, res) => {
  try {
    // fetch hostel Id 
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    const hostelId = userDetails.hostel;
    console.log(hostelId)


   // Extracting query parameters
    const { startDate, endDate, productName } = req.query;

   
    console.log(startDate);
    console.log( endDate);   
    console.log(productName); 

    

    const totalExpense = await DailyExpense.aggregate([
      {
        $match: {
          "hostel": hostelId,
          "productName" : productName,
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

    const productNameWiseExpense = await DailyExpense.find({
      hostel: hostelId,
      productName : productName,
      $expr: {
        $and: [
          { $gte: [{ $dateToString: { format: "%Y-%m-%d", date: "$dateOfExpense" } }, startDate] },
          { $lte: [{ $dateToString: { format: "%Y-%m-%d", date: "$dateOfExpense" } }, endDate] }
        ]
      }
    });
    console.log(totalExpense)
    let total = totalExpense.length > 0 ? totalExpense[0].total : 0;
    return res.status(200).json({
      success: true,
      message: 'Total Expense Fetched Successfully',
      total,
      productNameWiseExpense,
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







