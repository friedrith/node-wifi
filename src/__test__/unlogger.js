const fs = require('fs');

module.exports = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject();
      } else {
        resolve(data.replace(/.*\n/, ''));
      }
    });
  });
