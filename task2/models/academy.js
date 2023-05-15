const mongoose = require("mongoose");

const courseSchema = {
  courseName: String
};

const academySchema = {
  academyName: String,
  course: [courseSchema]
};

const Academy = mongoose.model("Academy", academySchema);
const Course = mongoose.model("Course", courseSchema);

const create = async (data) => {
  let course = new Course(data);
  return course.save();
};

const getAll = async () => {
  return Course.find({});
};

const getOne = async (name) => {
  return Course.findOne({ courseName: name });
};

const updateOne = async (name, data) => {
  return Course.updateOne({ courseName: name }, data);
};

const remove = async (name) => {
  return Course.deleteOne({ courseName: name });
};

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  remove,
};
