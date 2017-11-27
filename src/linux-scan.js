var exec = require('child_process').exec;
var networkUtils = require('./network-utils');
var env = require('./env');

function scanWifi(config, callback) {
  var commandStr = "nmcli --terse --fields active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags device wifi list";
  if (config.iface) {
      commandStr += ' ifname '+config.iface;
  }

  exec(commandStr, env, function(err, scanResults) {
      if (err) {
        callback && callback(err);
        return;
      }

      var lines = scanResults.split('\n');
      var networks = [];
      for (var i = 0 ; i < lines.length ; i++) {
        if (lines[i] != '') {
          var fields = lines[i].replace(/\\\:/g, '&&').split(':');
          networks.push({
            ssid: fields[1].replace(/\&\&/g, ':'),
            bssid: fields[2].replace(/\&\&/g, ':'),
            mac: fields[2].replace(/\&\&/g, ':'), // for retrocompatibility with version 1.x
            mode: fields[3].replace(/\&\&/g, ':'),
            channel: parseInt(fields[4].replace(/\&\&/g, ':')),
            frequency: parseInt(fields[5].replace(/\&\&/g, ':')),
            signal_level: networkUtils.dBFromQuality(fields[6].replace(/\&\&/g, ':')),
            security: fields[7].replace(/\&\&/g, ':') != '(none)' ? fields[7].replace(/\&\&/g, ':') : 'none',
            security_flags: {
              wpa:  fields[8].replace(/\&\&/g, ':'),
              rsn: fields[9].replace(/\&\&/g, ':'),
            }
          });
        }
      }
      callback && callback(null, networks);
  });
}

module.exports = function (config) {
  return function (callback) {
    if (callback) {
      scanWifi(config, callback);
    } else {
      return new Promise(function (resolve, reject) {
        scanWifi(config, function (err, networks) {
          if (err) {
            reject(err);
          } else {
            resolve(networks);
          }
        });
      });
    }
  }
};
