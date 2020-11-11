const mongoose = require("mongoose");

const citySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stateId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "State",
      default: undefined,
    },
  },
  { timestapms: true }
);

module.exports = mongoose.model("City", citySchema);
