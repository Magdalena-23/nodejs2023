const express = require("express");
const mongoose = require("mongoose");
const pages = require("./handlers/pages");
const callbacks = require("./handlers/callbacks");

const dsn =
  "mongodb+srv://zhivko:xx5pAIg0QFcszlrS@cluster0.mcazydz.mongodb.net/blogpostExercise?retryWrites=true&w=majority";

mongoose.connect(dsn);

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", pages.main);
app.get("/form_add_post", pages.formAdd);
app.get("/form_edit_post/:id", pages.formEdit);
app.get("/singlepost/:id", pages.showSinglepost);

app.post("/post/add", callbacks.create);
app.post("/post/edit/:id", callbacks.update);
app.get("/:id", callbacks.remove);

app.listen(8080, (err) => {
  if (err) return console.log(err);
  console.log("Server successfully started...");
});
