const mongoose = require("mongoose");

const officialSchema = new mongoose.Schema(
  {
    official_ID: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    civilNumber: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SCO = mongoose.model("school-officials", officialSchema);
module.exports = SCO;
