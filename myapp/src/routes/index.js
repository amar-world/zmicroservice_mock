const express = require("express");

const cmmsRoute = require('../apps/cmss/cmss.controller');
const appRoute = express();

appRoute.use("/cmss", cmmsRoute);

module.exports = appRoute;