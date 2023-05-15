let path = require("path");
let fsPromises = require("fs/promises");

let soureFolder = path.resolve(__dirname, "files");
let destinationFolder = path.resolve(__dirname, "files-copy");
let qwe = [];

fsPromises
  .mkdir(destinationFolder, { recursive: true })
  .then(() => {
    return fsPromises.readdir(soureFolder);
  })
  .then((data) => {
    qwe = data;
    return fsPromises.readdir(destinationFolder);
  })
  .then((data) => {
    data.forEach((el) => {
      fsPromises.unlink(path.join(destinationFolder, el));
    });
  })
  .then(() => {
    qwe.forEach((el) => {
      let pathToFile = path.join(soureFolder, el);
      let destFile = path.join(destinationFolder, el);

      fsPromises.copyFile(pathToFile, destFile);
    });
  })
  .catch((err) => {
    console.error(err);
  });
