const users = require("../models/userModel");
const fs = require("fs");

const uploadProfilePicture = async (req, res) => {
  try {
    let fileTypes = [
      "image/png",
      "image/jpg",
      "image/pjpeg",
      "image/jpeg",
      "image/gif",
    ];
    let maxFileSize = 5 * 1024 * 1024;
    if (!fileTypes.includes(req.files.slika.mimetype)) {
      return res.status(400).send("Bad request");
    }

    if (maxFileSize < req.files.slika.size) {
      return res.status(400).send("Bad request");
    }

    // let newFileName = `${strings.random(20)}_${req.files.slika.name}`;
    let newFilePath = `${__dirname}/../uploads/${newFileName}`;
    await req.files.slika.mv(newFilePath);
    await users.uploadProfileImage(req.params.user_id, newFilePath);
    res.status(201).send({ filename: newFileName });
  } catch (err) {
    console.log(err);
    return res.status(500).send("ISE!");
  }
};

const downloadProfilePicture = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send("Bad request");
    }
    let user = await users.getUserInfo(req.params.id);

    if (!user) {
      return res.status(401).send("User not found!");
    }

    if (!user.profile_img) {
      return res
        .status(401)
        .send(
          "User with id " + req.params.id + " does not have a profile picture."
        );
    }

    let filePath = user.profile_img;
    // check if file exists
    if (fs.existsSync(filePath)) {
      return res.status(200).download(filePath, user.profile_img.split("_")[1]);
    }

    return res
      .status(401)
      .send(
        "Profile picture for user with id " +
          user._id +
          " is not found on the server."
      );
  } catch (err) {
    console.log(err);
    return res.status(500).send("ISE!");
  }
};

module.exports = {
  // upload,
  // download
  uploadProfilePicture,
  downloadProfilePicture,
};
