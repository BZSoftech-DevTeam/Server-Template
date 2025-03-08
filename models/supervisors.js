const mongoose = require("mongoose");

const supervisorSchema = new mongoose.Schema(
  {
    sup_ID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    civilNumber: {
      type: String,
      required: true,
    },
    startDate: {
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

const SPV = mongoose.model("supervisors", supervisorSchema);
module.exports = SPV;