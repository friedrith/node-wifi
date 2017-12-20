var exec = require('child_process').exec;
var macProvider = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport';
var env = require('./env');
var networkUtils = require('./network-utils.js');

function parseAirport (stdout) {
    var lines = stdout.split('\n');

    var connections = [];
    var connection = {};
    lines.forEach(function (line) {
        if (line.match(/[ ]*agrCtlRSSI: (.*)/)) {
            connection.signal_level = parseInt(line.match(/[ ]*agrCtlRSSI: (.*)/)[1]);
        } else if (line.match(/[ ]*BSSID: ([a-zA-Z0-1:]*)/)) {
            var bssid = line.match(/[ ]*BSSID: ([0-9A-Fa-f:]*)/)[1];
            connection.mac = bssid;
            connection.bssid = bssid;
        } else if (line.match(/[ ]*SSID: (.*)/)) {
            connection.ssid = line.match(/[ ]*SSID: (.*)/)[1];
        } else if (line.match(/[ ]*link auth: (.*)/)) {
            connection.security = line.match(/[ ]*link auth: (.*)/)[1];
            connection.security_flags = [];
        } else if (line.match(/[ ]*channel: (.*)/)) {
            connection.channel = parseInt(line.match(/[ ]*channel: (.*)/)[1].split(',')[0]);
            connection.frequency = parseInt(networkUtils.frequencyFromChannel(parseInt(line.match(/[ ]*channel: (.*)/)[1].split(',')[0])));
            connections.push(connection);
            connection = {};
        }
    });

    return connections;
}

function getCurrentConnections(config, callback) {
  var commandStr = macProvider+" --getinfo" ;

  exec(commandStr, env, function(err, stdout) {
        if (err) {
            callback && callback(err);
        } else {
            callback && callback(null, parseAirport(stdout));
        }
  });
}

module.exports = function (config) {
    return function(callback) {
      if (callback) {
        getCurrentConnections(config, callback);
      } else {
        return new Promise(function (resolve, reject) {
          getCurrentConnections(config, function (err, currentConnections) {
            if (err) {
              reject(err);
            } else {
              resolve(currentConnections);
            }
          })
        });
      }

    }
}
