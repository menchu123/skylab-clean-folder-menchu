const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

console.log(chalk.yellow("hola peix"));

const cleanFolder = (directory) => {
  fs.readdir(directory, (error, files) => {
    if (error) {
      if (error.code === "ENOENT") {
        error.message = "ERROR. Introduce una carpeta que exista.";
      } else if (error.code === "ENOTDIR") {
        error.message = "ERROR. No es una carpeta.";
      }
      console.log(chalk.red(error.message));
      process.exit(1);
    }
    if (files.length === 0) {
      console.log(chalk.red("Aquí no hay nada"));
    } else {
      for (const file of files) {
        fs.statSync(directory + "/" + file).isDirectory()
          ? cleanFolder(path.join(directory, file))
          : fs.unlink(path.join(directory, file), (error) => {
              if (error) {
                console.log(chalk.red(error.message));
                process.exit(1);
              }
            });
        console.log(chalk.redBright("File deleted: " + file));
      }
    }
  });

  fs.rmdir(directory, { recursive: true }, (error) => {
    if (error) {
      console.log(chalk.red(error.message));
      process.exit(1);
    }
    console.log(chalk.redBright("File deleted: " + directory));
  });
};

(async () => {
  await cleanFolder("./Finals");
  console.log(chalk.green("Enhorabuena, has borrado todo"));
})();

//cleanFolder("./Finals");
