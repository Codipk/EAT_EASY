const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
    .then(() => console.log('DB connected Successfuly'))
    .catch((error) => {
      console.log('Connection Issue in DB');
      console.error(error);
      process.exit(1);
    })
}
