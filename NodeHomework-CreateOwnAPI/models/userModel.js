const mongoose = require("mongoose");

const usersSchema = {
  username: String,
  email: String,
  password: String,
};

const User = mongoose.model("User", usersSchema);

const create = async (data) => {
  let user = new User(data);
  return user.save();
};

const getAll = async () => {
  return User.find({});
};

const getOne = async (id) => {
  return User.findOne({ _id: id });
};

const updateOne = async (id, data) => {
  return User.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return User.deleteOne({ _id: id });
};

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  remove,
};
