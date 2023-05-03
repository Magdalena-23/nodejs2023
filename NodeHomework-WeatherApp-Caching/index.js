require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const { expressjwt: jwt } = require("express-jwt");
const ejs = require("ejs");
const handlers = require("./handlers/callbacks");
const storage = require("./handlers/storage");

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

app.use(express.static("public"));
app.set("view engine", ejs);
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());
app.use(
  jwt({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
  }).unless({
    path: ["/sign-up", "/login", "/forgot-password", "/reset-password"],
  })
);

app.get("/login", (req, res) => {
  const formData = { email: "", password: "" };
  res.render("login.ejs", { errors: null, formData });
});

app.get("/sign-up", (req, res) => {
  const formData = { email: "", password: "", confirm_password: "" };
  res.render("sign-up.ejs", { errors: null, formData });
});

app.get("/forgot-password", (req, res) => {
  res.render("forgot-password.ejs", { errors: null });
});

app.get("/", (req, res) => {
  // get the token from localStorage
  const token = localStorage.getItem("token");
  console.log(token);

  if (token) {
    // verify the token and continue with the route
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        // handle invalid tokens
        res.status(401).send("Invalid token");
      } else {
        // continue with the route
        res.render("home.ejs");
      }
    });
  } else {
    // handle missing tokens
    res.status(401).send("No authorization token was found");
  }
});

app.post("/sign-up", handlers.signUp);
app.post("/login", handlers.login);
app.post("/forgot-password", handlers.forgotPassword);
// api.post('/api/v1/storage/:user_id', storage.upload);
app.post("/", storage.uploadProfilePicture);
// api.get('/api/v1/storage/:file', storage.download);
app.get("/api/v1/user/:id/profile_picture", storage.downloadProfilePicture);

app.listen(process.env.PORT, (err) => {
  if (err) return console.log(err);

  console.log(`Server succesfully started on port: "${process.env.PORT}...`);
});
