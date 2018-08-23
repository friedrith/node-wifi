var exec = require('child_process').exec;
var env = require('./env');

function deleteConnection(config, ap, callback) {
  var commandStr = "nmcli device connection";

  if (config.iface) {
    commandStr += " " + config.iface;
  }

  commandStr += " " + ap.name;

  exec(commandStr, env, function (err, resp) {
    callback && callback(err);
  });

}

module.exports = function (config) {
  return function (ap, callback) {
    if (callback) {
      deleteConnection(config, ap, callback);
    } else {
      return new Promise(function (resolve, reject) {
        deleteConnection(config, ap, function (err) {
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