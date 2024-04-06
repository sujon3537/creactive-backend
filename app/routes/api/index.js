const express = require("express");
const _ = express.Router();

const backend = require("./backend");
const frontend = require("./frontend");

_.use("/backend", backend);
_.use("/frontend", frontend);

module.exports = _;
