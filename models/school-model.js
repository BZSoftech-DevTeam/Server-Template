const mongoose = require("mongoose");

const schoolInfoSchema = new mongoose.Schema(
  {
    school_ID: {
      type: String,
      required: true,
    },
    englishSchool: {
      type: String,
      required: true,
    },
    arabicSchool: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    eduAreas: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SCH = mongoose.model("school-information", schoolInfoSchema);
module.exports =SCH;
