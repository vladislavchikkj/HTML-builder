const fs = require('fs');
const path = require('path');
const { stdout } = require('process');
const pathToTxt = path.resolve(__dirname, 'text.txt');


const readStream = fs.createReadStream(pathToTxt, {
    encoding : 'utf8'
});
readStream.on('data', (chunk) => {
    stdout.write(chunk);
})

// stdout.write(readStream);
console.log(pathToTxt);

// fs.readFile(pathToTxt, (err, data) => {
//     console.log(data.toString());
// })