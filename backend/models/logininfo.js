const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  
  },
  email: {
    type: String,
    required: true,
    unique: true,

  },
  time: {
    type: Number,
    required: true,

  },
 
});

module.exports = mongoose.model("login_info", UserSchema);