const mongoose = require("mongoose");

const Blogpost = mongoose.model(
  "blogpost",
  {
    title: String,
    content: String,
    publish_date: Date,
  },
  "blogpost"
);

const getAll = async () => {
  return Blogpost.find({}).sort({ publish_date: -1 });
};

const getOne = async (id) => {
  return Blogpost.findOne({ _id: id });
};

const create = async (data) => {
  let blog_post = Blogpost(data);
  return blog_post.save();
};

const updateOne = async (id, data) => {
  return Blogpost.updateOne({ _id: id }, data);
};

const deleteOne = async (id) => {
  return Blogpost.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne,
};
