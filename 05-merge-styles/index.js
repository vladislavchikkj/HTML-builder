const fsPromise = require("fs/promises");
const fs = require("fs");
const path = require("path");
const soureFolder = path.join(__dirname, "styles");
const destinationFolder = path.join(__dirname, "project-dist", "bundle.css");
async function bundle() {
  const files = await fsPromise.readdir(soureFolder);
  const stream = fs.createWriteStream(destinationFolder);
    for (let i = 0; i < files.length; i++) {
      const stats = await fsPromise.stat(path.join(soureFolder, files[i]));
      if (stats.isFile() && path.parse(files[i]).ext === ".css") {
        const readableStream = fs.createReadStream(path.join(soureFolder, files[i]), "utf-8");
        readableStream.on("data", (data) => stream.write(data));
      }
  }
}
bundle();