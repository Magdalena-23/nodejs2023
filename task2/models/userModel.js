const mongoose = require("mongoose");

const usersSchema = {
  email: String,
  password: String,
};

const User = mongoose.model("User", usersSchema);

const createNewUser = async (data) => {
  let newUser = User(data);
  return newUser.save();
};

const findUserByEmail = async (email) => {
  return User.findOne({ email: email });
};

module.exports = {
  createNewUser,
  findUserByEmail,
};
