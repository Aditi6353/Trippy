const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,

  },
  package: {
    type: String,
    required: true,

  },
  route: {
    type: String,
    required: true,

  },
  image: {
    type: String,
    required: true,

  },
});

module.exports = mongoose.model("place_info", UserSchema);