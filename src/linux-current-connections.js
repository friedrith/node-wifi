var exec = require('child_process').exec;
var networkUtils = require('./network-utils');
var env = require('./env');

function getCurrentConnection(config, callback) {
  var commandStr = "nmcli --terse --fields active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags device wifi";
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
          if (fields[0] == 'yes') {
            callback && callback(null, {
              ssid: fields[1].replace(/\&\&/g, ':'),
              bssid: fields[2].replace(/\&\&/g, ':'),
              mac: fields[2].replace(/\&\&/g, ':'), // for retrocompatibility with version 1.x
              mode: fields[3].replace(/\&\&/g, ':'),
              channel: parseInt(fields[4].replace(/\&\&/g, ':')),
              frequency: parseInt(fields[5].replace(/\&\&/g, ':')),
              signal_level: networkUtils.dBFromQuality(fields[6].replace(/\&\&/g, ':')),
              security: fields[7].replace(/\&\&/g, ':'),
              security_flags: {
                wpa:  fields[8].replace(/\&\&/g, ':'),
                rsn: fields[9].replace(/\&\&/g, ':'),
              }
            })
            return;
          }
        }
      }
      callback && callback('no-connection');
  });
}

module.exports = function (config) {

    return function(callback) {
      if (callback) {
        getCurrentConnection(config, callback);
      } else {
        return new Promise(function (resolve, reject) {
          getCurrentConnection(config, function (err, connection) {
            if (err) {
              reject(err);
            } else {
              resolve(connection);
            }
          })
        });
      }
    }
}
