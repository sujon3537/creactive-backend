const express = require("express");
const _ = express.Router();

const {
  getAllPost,
  singlePost,
} = require("../../../controllers/frontend/blogController");

_.get("/allpost", getAllPost);
_.get("/:postId", singlePost);

module.exports = _;
