const express = require("express");
const _ = express.Router();
const auth = require("./auth");
const blog = require("./blogPost");

_.use("/auth", auth);
_.use("/blog", blog);

module.exports = _;
