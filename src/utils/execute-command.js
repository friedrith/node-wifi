const { execFile } = require('child_process');

const env = () =>
  Object.assign(process.env, {
    LANG: 'en_US.UTF-8',
    LC_ALL: 'en_US.UTF-8',
    LC_MESSAGES: 'en_US.UTF-8'
  });

module.exports = ({ cmd, args }) =>
  new Promise((resolve, reject) => {
    execFile(cmd, args, { env: env() }, (error, output) => {
      if (error) {
        reject(error);
      } else {
        resolve(output);
      }
    });
  });
