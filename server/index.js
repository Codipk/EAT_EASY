const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors());
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const fileUplaod = require("express-fileupload");
app.use(
  fileUplaod({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//config
const db = require("./config/db");
db.connect();
const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();


const userRoutes = require('./routes/user');
const complaintRoutes = require('./routes/complaint');
const profileRoutes = require('./routes/profile');
const menuRoutes = require('./routes/menu');
const committeeRoutes = require('./routes/commitee');
const dailyExpense= require('./routes/expense');

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/complaint", complaintRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/committee", committeeRoutes);
app.use("/api/v1/expense", dailyExpense)

//adding defaut route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running up",
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
