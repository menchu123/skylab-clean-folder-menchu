const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

console.log(chalk.yellow("hola peix"));

const cleanFolder = (directory) => {
  fs.readdir(directory, (error, files) => {
    console.log(files);
  });
};

cleanFolder(".");
