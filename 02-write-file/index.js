const reject = require('assert');
const fs = require('fs');
const path = require('path');

console.log("Введите текст который выхотите добавить: ");

const writeFileAsync = async(path, data) => {
  return new Promise((resolve, reject) => fs.writeFile(path, data, (err) => {
    if(err) {
      return reject(err.message)
    }
    resolve()
  }))
} 

const appendFileAsync = async(path, data) => {
  return new Promise((resolve, reject) => fs.appendFile(path, data, (err) => {
    if(err) {
      return reject(err.message)
    }
    resolve()
  }))
} 


writeFileAsync(path.resolve(__dirname, 'text.txt'), '')
  .then(() => {
    process.stdin.on('data', data => {
      let text = data.toString().trim();
      if(text === 'exit'){
        console.log('Процесс завершен');
        process.exit();
      }
      appendFileAsync(path.resolve(__dirname, 'text.txt'), text)
      .catch(err => console.log(err))
      
      console.log(`Текст который вы добавили: ${text}`);
      
    });
    
    process.on('SIGINT', data => {
      console.log('Процесс завершен');
      process.exit()
    });
  })