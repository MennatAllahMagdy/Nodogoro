const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  authUserID: { type: String, required: true },
  age: { type: Number },
  temperarture: { type: Number },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
});
module.exports = mongoose.model("User", userSchema);
