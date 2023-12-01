const Rating = require('../models/ratingSchema');
const User = require('../models/userSchema');

exports.createRating = async (req, res) => {

  // const date = new Date(Date.now());
  // const dayOfWeekNumber = date.getDay();
  // let numDayToWordDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  //console.log(numDayToWordDay[0]);//should return sunday
  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    const hostelId = userDetails.hostel;
    let { rating, mealType, date } = req.body;
    //check whether user has already rated or not
    const isAlreadyRated = await Rating.findOne({
      user: userId,
      date: date,
      mealType: mealType,
    });
    if (isAlreadyRated) {
      return res.status(403).json({
        success: false,
        message: 'User Has Already Rated'
      });
    }

    // Create a TTL index on the 'createdAt' field with an expiration time of 3600*24*30 seconds (30 day)
    // await db.Rating.index({ "createdAt": 1 }, { expireAfterSeconds: 3600 * 24 * 30 });
    const newRating = await Rating.create({
      user: userId,
      rating,
      date,
      mealType,
      hostel: hostelId,
    });
    return res.status(200).json({
      success: true,
      message: 'Rating Created Successfully',
      newRating,
    });

  } catch (error) {
    console.log("Error in creating rating : ", error);
    return res.status(200).json({
      success: false,
      message: 'Internal Server Error',
      error,
    });
  }


}
//create ke time hi average update krle
//alg se update kr ne ki jrut hi na pde

//find average breakfast/lunch/snack/dinner rating
exports.findAvgRating = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    const result = await Rating.aggregate([
      // {
      //   $match: {
      //     hostel: userDetails.hostel,
      //   },
      // },
      {
        $group: {
          _id: "$mealType",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    console.log("Result: ", result[0])
    // Output the average rating
    if (result.length == 0) {
      return res.status(200).json({
        success: true,
        message: 'No Rating Exist!'
      });
    }
    // console.log("Result : ", result);
    let totalRating = 0;
    for (let i = 0; i < result.length; i++) {
      totalRating += result[i].averageRating;
    }
    console.log("totalRating", totalRating);
    const totalAvgRating = totalRating / (result.length);
    return res.status(200).json({
      success: true,
      message: 'Rating Fetched Successfully',
      result,
      totalAvgRating,
    });

  } catch (error) {
    console.log("Error in finding avg rating : ", error);
    return res.status(200).json({
      success: true,
      message: 'Internal Server Error',
      error,
    });
  }
}



