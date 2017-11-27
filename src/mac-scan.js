var exec = require('child_process').exec;
var macProvider = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport';
var networkUtils = require('./network-utils.js');
var env = require('./env');

function scanWifi(config, callback) {

  var networks = []
  var network = {}

  exec(macProvider + ' -s', env,  function(err, scanResults) {

      if (err) {
          callback && callback(err);
      }

      var terms = {
          BSSID: 'BSSID',
          RSSI: 'RSSI',
          CHANNEL: 'CHANNEL',
          HT: 'HT',
          SECURITY: 'SECURITY',
          CC: 'CC'
      };

      var resp = parseAirport(terms, scanResults);
      callback && callback(null, resp);
  });
}


function parseAirport(terms, str) {

    var lines = str.split('\n');
    var colSsid = 0;
    var colMac = lines[0].indexOf(terms.BSSID);
    var colRssi = lines[0].indexOf(terms.RSSI);
    var colChannel = lines[0].indexOf(terms.CHANNEL);
    var colHt = lines[0].indexOf(terms.HT);
    var colSec = lines[0].indexOf(terms.SECURITY);
    //var colCC = lines[0].indexOf(terms.CC);

    var wifis = [];
    for (var i=1,l=lines.length; i<l; i++) {
        var bssid = lines[i].substr(colMac, colRssi - colMac).trim();
        var securityFlags = lines[i].substr(colSec).trim();
        var security = "none";
        if (securityFlags != "NONE") {
          security = securityFlags.replace(/\(.*?\)/g, '');
          securityFlags = securityFlags.match(/\((.*?)\)/g);
        } else {
          security = "none";
          securityFlags = [];
        }
        wifis.push({
            'mac' : bssid, // for retrocompatibility
            'bssid': bssid,
            'ssid' : lines[i].substr(0, colMac).trim(),
            'channel': parseInt(lines[i].substr(colChannel, colHt - colChannel)),
            'frequency' : parseInt(networkUtils.frequencyFromChannel(lines[i].substr(colChannel, colHt - colChannel).trim())),
            'signal_level' : lines[i].substr(colRssi, colChannel - colRssi).trim(),
            'security' : security,
            'security_flags': securityFlags
        });
    }
    wifis.pop();
    return wifis;
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
        })
      })
    }
  }
};
