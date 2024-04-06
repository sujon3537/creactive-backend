const express = require("express");
const _ = express.Router();
const api = require("./api");
const rooturl = process.env.BASE_URL;

_.use(rooturl, api);
_.use(rooturl, (req, res) =>
  res.json({ error: "No api found on this route!" })
);

module.exports = _;
