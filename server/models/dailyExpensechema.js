const mongoose = require('mongoose');

const dailyExpenseSchema = new mongoose.Schema({
 hostel:{
  type : mongoose.Schema.Types.ObjectId,
  ref: 'Hostel',
  required: true,

 },
  productName :{
  type : String,
  trim: true,
  required:true,

 },
 productDescription :{
  type : String,
  trim: true,

 },
 productQuantity : {
  type : String,
  trim: true,

 },
 productPrice:{
  type : Number,
  required:true,

 } 
},
 { timestamps: true });



module.exports = mongoose.model("DailyExpense", dailyExpenseSchema);
