const { execFile } = require('child_process');
const env = require('../env');

const maxBuffer = 1024 * 1024 * 1024 * 1024;
const timeout = 1000;

const options = { env, maxBuffer, timeout };

module.exports = ({ cmd, args }) =>
  new Promise((resolve, reject) => {
    execFile(cmd, args, options, (error, output) => {
      if (error) {
        reject(error);
      } else {
        resolve(output);
      }
    });
  });
