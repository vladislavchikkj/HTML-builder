const fs = require('fs');
const path = require('path');
const qwe = path.join(__dirname, 'project-dist');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
    if (err) throw err;
  });
  //function for inserting page components
async function insert(tempChunk) {
    const tempTags = tempChunk.match(/{{[^{}]+}}/g);
    const src = path.join(__dirname, 'components');
    for (const tempTag of tempTags) {
    const readStream = fs.createReadStream(src + tempTag.slice(2, -2) + '.html', 'utf-8');
    for await (const chunk of readStream) {
    tempChunk = tempChunk.replace(`${tempTag}`, chunk);
        }
    }
    return tempChunk;
}
// create html page  
async function createHtml() {
    const templateFile = path.join(__dirname, 'template.html');
    console.log(templateFile);
    const readStream = fs.createReadStream(templateFile, 'utf-8');
    const writeStream = fs.createWriteStream(qwe + 'index.html');
        for await (const chunk of readStream) {
            writeStream.write(await insert(chunk));
        }
}

//copy - direrctory
async function copyDirerctory(src, qwe) {
    await fs.promises.rm(qwe, { recursive: true, force: true });
    await fs.promises.mkdir(qwe, { recursive: true });
    const files = await fs.promises.readdir(src, { withFileTypes: true });
        for (const file of files) {
            if (!file.isDirectory()) {
            const readStream = fs.createReadStream(src + file.name);
            const writeStream = fs.createWriteStream(qwe + file.name);
            readStream.pipe(writeStream);
            } else {
            copyDirerctory(src + file.name + '/', qwe + file.name + '/');
            }
        }
}
async function addStyle(src, qwe) {
    const writeStream = fs.createWriteStream(qwe + 'style.css');
    const files = await fs.promises.readdir(src, { withFileTypes: true });
        for (const file of files) {
            if (!file.isDirectory() && path.extname(file.name) === '.css') {
            const readStream = fs.createReadStream(src + file.name);
            readStream.pipe(writeStream, { end: false });
            }
        }
    writeStream.end;
}
async function finalBuild() {
    await fs.promises.rm(qwe, { recursive: true, force: true });
    await fs.promises.mkdir(qwe, { recursive: true });
        createHtml();
        copyDirerctory(path.join(__dirname, 'assets/'), qwe + 'assets/');
        addStyle(path.join(__dirname, 'styles/'), qwe);
}

finalBuild();