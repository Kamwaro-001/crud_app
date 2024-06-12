const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    age: {
      type: Number,
    },
    town: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
