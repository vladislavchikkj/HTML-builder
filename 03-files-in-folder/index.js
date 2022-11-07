const fs = require('fs/promises');
const path = require('path');


const promise = fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
promise.then(function () {
    for (let i = 0; i < arguments[0].length; i++) {
        if (arguments[0][i].isDirectory() === false) {
            const wayFile = path.join(__dirname, 'secret-folder', arguments[0][i].name);
            const extFile = path.extname(wayFile).slice(1);
            const curName = path.basename(wayFile);
            const num = curName.lastIndexOf(extFile) - 1;
            const nameFile = curName.slice(0, num);
            const subPromise = fs.stat(wayFile);
            subPromise.then(function () {
                sizeFile = arguments[0].size;
                process.stdout.write(`${nameFile} - ${extFile} - ${sizeFile / 1024}kb \n`);
            });
        }
    }
});