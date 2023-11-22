const Menu = require("../models/menuSchema");
const User = require("../models/userSchema");
const Hostel = require("../models/hostelSchema");
const axios = require('axios');
//add menu
exports.addMessMenu = async (req, res) => {
  try {
    //fetch userId
    //get hostel name from userId
    //fetch menu from req.body

    //fetch usrId
    const userId = req.user.id;
    const data = req.body;
    const userDetails = await User.findById(userId);
    console.log(userDetails);
    //const hostelDetails = await Hostel.findById(userDetails.hostel);
    const newMenu = await Menu.create({
      hostel: userDetails.hostel,
      monday: {
        breakFast: data.monday.breakFast,
        lunch: data.monday.lunch,
        snacks: data.monday.snacks,
        dinner: data.monday.dinner,
      },
      tuesday: {
        breakFast: data.tuesday.breakFast,
        lunch: data.tuesday.lunch,
        snacks: data.tuesday.snacks,
        dinner: data.tuesday.dinner,
      },
      wednesday: {
        breakFast: data.wednesday.breakFast,
        lunch: data.wednesday.lunch,
        snacks: data.wednesday.snacks,
        dinner: data.wednesday.dinner,
      },
      thursday: {
        breakFast: data.thursday.breakFast,
        lunch: data.thursday.lunch,
        snacks: data.thursday.snacks,
        dinner: data.thursday.dinner,
      },
      friday: {
        breakFast: data.friday.breakFast,
        lunch: data.friday.lunch,
        snacks: data.friday.snacks,
        dinner: data.friday.dinner,
      },
      saturday: {
        breakFast: data.saturday.breakFast,
        lunch: data.saturday.lunch,
        snacks: data.saturday.snacks,
        dinner: data.saturday.dinner,
      },
      sunday: {
        breakFast: data.sunday.breakFast,
        lunch: data.sunday.lunch,
        snacks: data.sunday.snacks,
        dinner: data.sunday.dinner,
      },
      updatedBy: userId,
    });
    return res.status(200).json({
      success: true,
      message: "Mess Menu created Successfully",
      newMenu,
    });
  } catch (error) {
    console.log("Error in creating mess menu: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
//view menu
exports.viewMessMenu = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    const hostelDetails = await Hostel.findById(userDetails.hostel);
    const messMenu = await Menu.find({ hostel: hostelDetails._id }).populate({
      path: "updatedBy",
      populate: {
        path: "additionalDetails",
      },
    });

    return res.status(200).json({
      sucess: true,
      message: "Menu fetched Sucessfully",
      messMenu,
    });
  } catch (error) {
    console.log("error in fetching mess menu: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
// edit menu -> exactly same as add mess menu
exports.editMessMenu = async (req, res) => {
  try {
    //fetch userId
    //get hostel name from userId
    //fetch menu from req.body
    //update details of mess menu and updatedBy:userId
    //fetch usrId
    const userId = req.user.id;
    console.log("req", req);
    const userDetails = await User.findById(userId);
    //const hostelDetails = await Hostel.findById(userDetails.hostel);
    console.log("userdetails in edit mess menu", userDetails);
    const { data, menuId } = req.body;
    const newMenu = await Menu.findByIdAndUpdate(
      menuId,
      {
        hostel: userDetails.hostel,
        monday: {
          breakFast: data.monday.breakFast,
          lunch: data.monday.lunch,
          snacks: data.monday.snacks,
          dinner: data.monday.dinner,
        },
        tuesday: {
          breakFast: data.tuesday.breakFast,
          lunch: data.tuesday.lunch,
          snacks: data.tuesday.snacks,
          dinner: data.tuesday.dinner,
        },
        wednesday: {
          breakFast: data.wednesday.breakFast,
          lunch: data.wednesday.lunch,
          snacks: data.wednesday.snacks,
          dinner: data.wednesday.dinner,
        },
        thursday: {
          breakFast: data.thursday.breakFast,
          lunch: data.thursday.lunch,
          snacks: data.thursday.snacks,
          dinner: data.thursday.dinner,
        },
        friday: {
          breakFast: data.friday.breakFast,
          lunch: data.friday.lunch,
          snacks: data.friday.snacks,
          dinner: data.friday.dinner,
        },
        saturday: {
          breakFast: data.saturday.breakFast,
          lunch: data.saturday.lunch,
          snacks: data.saturday.snacks,
          dinner: data.saturday.dinner,
        },
        sunday: {
          breakFast: data.sunday.breakFast,
          lunch: data.sunday.lunch,
          snacks: data.sunday.snacks,
          dinner: data.sunday.dinner,
        },
        updatedBy: userId,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Mess Menu Updated Successfully",
      newMenu,
    });
  } catch (error) {
    console.log("Error in Updated mess menu: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.getNutritionDetails = async (req, res) => {

  let apiUrl = 'https://api.api-ninjas.com/v1/nutrition?query=';
  const apiKey = process.env.NUTRITION_API_KEY;
  const { itemName, itemQuantity } = req.body;
  apiUrl = `${apiUrl} + ${itemName}`

  axios.get(apiUrl, {
    headers: {
      'X-Api-Key': apiKey
      // You might need to use a different header key or format based on the API documentation
    }
  })
    .then(response => {
      const apiRes = response.data[0]; // Assuming the API returns the date directly
      //calories
      //protein_g
      //carbohydrates_total_g
      //fat_total_g
      const data = {};
      data.calories = (apiRes.calories * itemQuantity) / 100;
      data.protein_g = (apiRes.protein_g * itemQuantity) / 100;
      data.carbohydrates_total_g = (apiRes.carbohydrates_total_g * itemQuantity) / 100;
      data.fat_total_g = (apiRes.fat_total_g * itemQuantity) / 100;
      return res.status(200).json({
        success: true,
        message: 'Calories Fetched Successfully',
        data,
      });
    })
    .catch(error => {
      console.error('Error fetching date:', error);
    });



}

