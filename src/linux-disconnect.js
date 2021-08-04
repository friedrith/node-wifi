const execFile = require('child_process').execFile;
const env = require('./env');

function disconnect(config, callback) {
  const args = [];
  args.push('device');
  args.push('disconnect');

  if (config.iface) {
    args.push(config.iface);
  }

  execFile('nmcli', args, { env }, err => {
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
