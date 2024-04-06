const express = require("express");
const _ = express.Router();
const multer = require("multer");
const path = require("node:path");

const {
  register,
  verifyEmail,
  loginPage,
  login,
} = require("../../../controllers/backend/authController");
const {
  userFormValidation,
  loginValidation,
} = require("../../../middleware/formValidation");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    const fileExtenstion = path.extname(file.originalname);
    const fileName = file.originalname
      .replace(fileExtenstion, "")
      .toLocaleLowerCase()
      .split(" ")
      .join("-");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, fileName + "-" + uniqueSuffix + fileExtenstion);
  },
});

const upload = multer({ storage: storage });

_.post(
  "/register",
  upload.single("image_upload"),
  userFormValidation,
  register
);
_.get("/emailverify/:token", verifyEmail);
_.get("/loginpage", loginPage);
_.post("/login", loginValidation, login);

module.exports = _;
