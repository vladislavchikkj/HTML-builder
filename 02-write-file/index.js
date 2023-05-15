const rl = require("readline");
const fs = require("fs");
const path = require("path");

const writeSream = fs.createWriteStream(path.join(__dirname, "output.txt"), {
  flags: "a",
});

const readLine = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLine.on("line", (data) => {
  if (data === "exit") {
    process.exit();
  }
  writeSream.write(data + "\n");
});

readLine.on("SIGINT", () => {
  console.log("bye!");
  process.exit();
});

console.log("type something...");
