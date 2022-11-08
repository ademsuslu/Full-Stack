const mongoose = require("mongoose");

const goalChema = new mongoose.Schema(
  {
    user: {
      // hangi userin texti ise onu belirtiyor
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    text: {
      type: String,
      require: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalChema);
