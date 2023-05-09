const express = require("express");
const main = require("../routes/main");
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api", main);

  app.use(error);
};
