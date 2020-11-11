const mongoose = require("mongoose");

const stateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    abbreviation: {
      type: String,
      required: true,
    },
  },
  { timestapms: true }
);

module.exports = mongoose.model("State", stateSchema);
