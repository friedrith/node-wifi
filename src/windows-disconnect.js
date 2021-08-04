const execFile = require('child_process').execFile;
const env = require('./env');

function disconnect(config, callback) {
  const cmd = 'netsh';
  const params = ['wlan', 'disconnect'];
  if (config.iface) {
    params.push(`interface="${config.iface}"`);
  }
  execFile(cmd, params, { env }, err => {
    callback && callback(err);
  });
}

module.exports = config => {
  return callback => {
    if (callback) {
      disconnect(config, callback);
    } else {
      return new Promise((resolve, reject) => {
        disconnect(config, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  };
};
