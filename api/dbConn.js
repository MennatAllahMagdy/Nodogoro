const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_CONNECTION_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
