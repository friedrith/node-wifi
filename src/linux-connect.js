var exec = require('child_process').exec;
var util = require('util');
var env = require('./env');

var escapeShell = function(cmd) {
    return '"'+cmd.replace(/(["\s'$`\\])/g,'\\$1')+'"';
};

function connectToWifi(config, ap, callback) {
  var commandStr = "nmcli -w 10 device wifi connect '" + ap.ssid + "'" +
      " password " + "'" + ap.password + "'" ;

  if (config.iface) {
      commandStr = commandStr + " ifname " + config.iface;
  }

    // commandStr = escapeShell(commandStr);

  exec(commandStr, env, function(err, resp) {
      callback && callback(err);
  });
}


module.exports = function (config) {

    return function(ap, callback) {
      if (callback) {
        connectToWifi(config, ap, callback);
      } else {
        return new Promise(function (resolve, reject) {
          connectToWifi(config, ap, function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          })
        });
      }
    }
}
