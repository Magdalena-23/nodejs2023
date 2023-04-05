const express = require("express");
const mongoose = require("mongoose");
const users = require("./handlers/users");
const app = express();

mongoose.connect(
  "mongodb+srv://mandonovska99:987321@javascriptacademy.t9aar8f.mongodb.net/usersDB?retryWrites=true&w=majority"
);

const PORT = 8080;
app.use(express.json());

app.get("/users/:id", users.getOne);
app.get("/users", users.getAll);
app.post("/users", users.create);
app.put("/users/:id", users.updateOne);
app.patch("/users/:id", users.partialUpdateOne);
app.delete("/users/:id", users.deleteOne);

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server running on port: http://localhost:${PORT}`);
});
