const fs = require("fs");
//const appRoot = require("app-root-path");

const accessLogStream = fs.createWriteStream(
    "./log/access.log",
    {flag: "a"}
)

module.exports = accessLogStream;