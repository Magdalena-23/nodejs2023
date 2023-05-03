const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const usersSchema = {
  email: String,
  password: String,
  profile_img: String,
};

const User = mongoose.model("User", usersSchema);

const createNewUser = async (data) => {
  let newUser = User(data);
  return newUser.save();
};

const findUserByEmail = async (email) => {
  return User.findOne({ email: email });
};

const getUserInfo = async (user_id) => {
  if (ObjectId.isValid(user_id)) {
    return User.findOne({ _id: user_id });
  }

  return null;
};

const uploadProfileImage = async (user_id, imageFilePath) => {
  return User.updateOne({ _id: user_id }, { profile_img: imageFilePath });
};

module.exports = {
  createNewUser,
  findUserByEmail,
  getUserInfo,
  uploadProfileImage,
};
