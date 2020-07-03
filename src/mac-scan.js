var execFile = require('child_process').execFile;
var env = require('./env');
const getCommand = require('./macOS/scan/command.js');
const parse = require('./macOS/scan/parser');

function scanWifi(config, callback) {
  const { cmd, args } = getCommand(config);

  execFile(cmd, args, { env }, function(err, scanResults) {
    if (err) {
      callback && callback(err);
    }

    var resp = parse(scanResults);
    callback && callback(null, resp);
  });
}

module.exports = function(config) {
  return function(callback) {
    if (callback) {
      scanWifi(config, callback);
    } else {
      return new Promise(function(resolve, reject) {
        scanWifi(config, function(err, networks) {
          if (err) {
            reject(err);
          } else {
            resolve(networks);
          }
        });
      });
    }
  };
};
