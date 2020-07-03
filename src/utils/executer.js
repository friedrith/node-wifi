const { execFile } = require('child_process');
const env = require('../env');

module.exports = ({ cmd, args }) =>
  new Promise((resolve, reject) => {
    execFile(cmd, args, { env }, (error, output) => {
      if (error) {
        reject(error);
      } else {
        resolve(output);
      }
    });
  });
