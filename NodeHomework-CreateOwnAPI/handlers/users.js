const users = require("../models/userModel");

const getAll = async (req, res) => {
  try {
    let data = await users.getAll();
    res.send(data).status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getOne = async (req, res) => {
  try {
    let data = await users.getOne(req.params.id);
    res.send(data).status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const create = async (req, res) => {
  try {
    let data = req.body;
    await users.create(data);
    res.send(data).status(201);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateOne = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    await users.updateOne(id, data);
    res.send(data).status(204);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const partialUpdateOne = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    await users.updateOne(id, data);
    res.send(data).status(204);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteOne = async (req, res) => {
  try {
    await users.remove(req.params.id);
    res.send("").status(204);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  updateOne,
  partialUpdateOne,
  deleteOne,
};
