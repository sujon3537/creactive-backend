const express = require("express");
const _ = express.Router();
const multer = require("multer");
const path = require("node:path");

const {
  createBlogPost,
  updateBlogPost,
  getAllPost,
  singlePost,
} = require("../../../controllers/backend/blogController");

const { postValidation } = require("../../../middleware/formValidation");

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
  "/createpost",
  upload.single("post_image"),
  postValidation,
  createBlogPost
);
_.post(
  "/updatepost",
  upload.single("updated_image"),
  // postValidation,
  updateBlogPost
);
_.get("/allposts", getAllPost);
_.get("/post/:postId", singlePost);

module.exports = _;
