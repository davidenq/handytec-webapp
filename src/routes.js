"use strict";
const { home } = require("./handlers/home");

exports.routes = async (app) => {
  app.get("/", home);
};
