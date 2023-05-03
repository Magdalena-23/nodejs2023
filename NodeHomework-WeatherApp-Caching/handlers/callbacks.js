const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { email, password, confirm_password } = req.body;

  const errors = {};

  function validateEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  try {
    // Check if the email input is valid
    if (!validateEmail(email)) {
      errors.email = "Invalid email address";
    }

    //Check if the email already exists in the database
    if (email.length !== 0) {
      let checkUser = await user.findUserByEmail(email);
      if (checkUser) {
        errors.email = "User already exists";
      }
    }

    //Check if the password field is not empty and has more than 8 characters
    if (password.trim().length === 0) {
      errors.password = "Invalid password";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    //Check if password matches with password confirm
    if (password !== confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      // res.status(400).json({ errors });
      console.log(errors);
      res.render("sign-up.ejs", { errors, formData: req.body });
    } else {
      // Hash password, save user data to database and redirect to login page
      const hashedPassword = bcrypt.hashSync(password);
      let data = {
        ...req.body,
        password: hashedPassword,
      };
      await user.createNewUser(data);
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const errors = {};

  try {
    //Checks if the email exists in the database
    let foundUser = await user.findUserByEmail(req.body.email);

    if (!foundUser) {
      errors.email = "Wrong email address.";
    }

    //Hashes the password and then checks if it is same as the one in the database
    else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      // Hash the password entered by the user
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      if (!bcrypt.compareSync(hashedPassword, foundUser.password)) {
        errors.password = "Wrong password";
      }
    }

    if (Object.keys(errors).length > 0) {
      res.render("login.ejs", { errors, formData: req.body });
    } else {
      //Generate payload
      let payload = {
        uid: foundUser._id,
        email: foundUser.email,
        role: "user",
      };

      // Generate a token with the payload and secret key
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const errors = {};

  try {
    const foundUser = await user.findUserByEmail(email);

    if (!foundUser) {
      errors.email = "User not found. Please enter a valid email";
    }

    if (Object.keys(errors).length > 0) {
      res.render("forgot-password.ejs", { errors, formData: req.body });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  signUp,
  login,
  forgotPassword,
};
