const mongoose = require("mongoose");

const userStatisticsSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
    },
    image: {
        type: String,
        required: true
    },
    firstName: {
      type: String,
      required: true,
    },
    secondName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    CIVIL_ID: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const USD = mongoose.model("user-information", userStatisticsSchema);
module.exports = USD;
