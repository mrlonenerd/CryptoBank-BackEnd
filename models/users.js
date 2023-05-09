const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userAddress: String,
  balance: String,
  txHistory: Array,
});

module.exports = mongoose.model("users", userSchema);
