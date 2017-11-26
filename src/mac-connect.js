var exec = require('child_process').exec;
var env = require('./env');

function connectToWifi(config, ap, callback) {

  var iface = 'en0';
  var commandStr = "networksetup -setairportnetwork ";

  if (config.iface) {
      iface = config.iface.toString();
  }

  commandStr = commandStr + "'" + iface + "'" + " " + "'" + ap.ssid + "'" + " " + "'" + ap.password + "'";
  //console.log(commandStr);

  exec(commandStr, env, function(err, resp, stderr) {
    //console.log(stderr, resp);
    if (resp && resp.indexOf('Failed to join network') >= 0) {
      callback && callback(resp);
    } else {
      callback && callback(err);
    }
  });
}

module.exports = function (config) {
  return function (ap, callback) {
    if (callback) {
      connectToWifi(config, ap, callback);
    } else {
      return new Promise(function (resolve, reject) {
        connectToWifi(config, ap, function (err, networks) {
          if (err) {
            reject(err);
          } else {
            resolve(networks);
          }
        })
      });
    }
  }

};
