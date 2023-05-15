const fs = require("fs");
const path = require("path");
const pathToTxt = path.resolve(__dirname, "text.txt");

const readStream = fs.createReadStream(pathToTxt, "utf8");

readStream.on("data", (chunk) => {
  console.log(chunk);
});

readStream.on("error", (err) => {
  console.error(err);
});
