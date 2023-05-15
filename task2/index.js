const express = require("express");
const mongoose = require("mongoose");
const courses = require("./handlers/auth/courses");
const { expressjwt: jwt } = require("express-jwt");
const app = express();
const auth = require("./handlers/auth/auth");

mongoose.connect(
  "mongodb+srv://mandonovska99:987321@javascriptacademy.t9aar8f.mongodb.net/coursesDB?retryWrites=true&w=majority"
);

api.use(express.json());
api.use(
  jwt({
    algorithms: ["HS256"],
    secret: "Hello",
  }).unless({
    path: [
      "/api/v1/auth/sign-up",
      "/api/v1/auth/login",
      "/api/v1/auth/forgot-password",
      "/api/v1/auth/reset-password",
    ],
  })
);

const PORT = 8080;
app.use(express.json());

app.get("/courses/:name", courses.getOne);
app.get("/courses", courses.getAll);
app.post("/courses", courses.create);
app.put("/courses/:name", courses.updateOne);
app.patch("/courses/:name", courses.partialUpdateOne);
app.delete("/courses/:name", courses.deleteOne);

api.post("/api/v1/auth/sign-up", auth.signUp);
api.post("/api/v1/auth/login", auth.login);

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server running on port: http://localhost:${PORT}`);
});
