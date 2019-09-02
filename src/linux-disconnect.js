var execFile = require('child_process').execFile;
var env = require('./env');

function disconnect(config, callback) {
  var args = [];
  args.push('device');
  args.push('disconnect');

  if (config.iface) {
    args.push(config.iface);
  }

  execFile('nmcli', args, { env }, function(err) {
    callback && callback(err);
  });
}

module.exports = function(config) {
  return function(callback) {
    if (callback) {
      disconnect(config, callback);
    } else {
      return new Promise(function(resolve, reject) {
        disconnect(config, function(err) {
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
