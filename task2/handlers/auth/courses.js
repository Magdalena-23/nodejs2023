const academy = require("../../models/academy");

const getAll = async (req, res) => {
    try {
      let data = await academy.getAll();
      res.send(data).status(200);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
  
  const getOne = async (req, res) => {
    try {
      let data = await academy.getOne(req.params.name);
      res.send(data).status(200);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
  
  const create = async (req, res) => {
    try {
      let data = req.body;
      await academy.create(data);
      res.send(data).status(201);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
  
  const updateOne = async (req, res) => {
    try {
      let id = req.params.name;
      let data = req.body;
      await academy.updateOne(name, data);
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
      await academy.updateOne(name, data);
      res.send(data).status(204);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
  
  const deleteOne = async (req, res) => {
    try {
      await academy.remove(req.params.name);
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