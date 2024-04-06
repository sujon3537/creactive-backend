const express = require("express");
const _ = express.Router();

const blog = require("./blog");

_.use("/blog", blog);

module.exports = _;
