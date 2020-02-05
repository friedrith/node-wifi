var execFile = require('child_process').execFile;
var networkUtils = require('./network-utils');
var env = require('./env');

function scanWifi(config, callback) {
  try {
    execFile(
      'netsh',
      ['wlan', 'show', 'networks', 'mode=Bssid'],
      { env },
      function (err, scanResults) {
        if (err) {
          callback && callback(err);
          return;
        }

        scanResults = scanResults
          .toString('utf8')
          .split('\r')
          .join('')
          .split('\n')
          .slice(5, scanResults.length);

        var numNetworks = -1;
        var currentLine = 0;
        var networkTmp;
        var networksTmp = [];
        var network;
        var networks = [];
        var i;

        const bssids = [];

        for (i = 0; i < scanResults.length; i++) {
          if (scanResults[i] === '') {
            numNetworks++;
            networkTmp = scanResults.slice(currentLine, i);
            networksTmp.push(networkTmp);
            currentLine = i + 1;
          }
        }

        for (i = 0; i < networksTmp.length; i++) {
          let thisNetwork = networksTmp[i];
          if (thisNetwork.length > 0) {
            const splits = thisNetwork.join('\n').toString().split(/BSSID/i);
            if (splits.length > 2) {
              for (a = 2; a < splits.length; a++) {
                networks.push(parseBssid(thisNetwork, splits[a].split('\n')));
              }
            } else {
              bssids.push(thisNetwork);
            }
          }
        }

        for (i = 0; i < bssids.length; i++) {
          network = parse(networksTmp[i]);
          networks.push(network);
        }

        callback && callback(null, networks);
      }
    );
  } catch (e) {
    callback && callback(e);
  }
}

function parse(networkTmp) {
  var network = {};

  network.mac = networkTmp[4] ? networkTmp[4].match(/.*?:\s(.*)/)[1] : '';
  network.bssid = network.mac;
  network.ssid = networkTmp[0] ? networkTmp[0].match(/.*?:\s(.*)/)[1] : '';
  network.channel = networkTmp[7]
    ? parseInt(networkTmp[7].match(/.*?:\s(.*)/)[1])
    : -1;
  network.frequency = network.channel
    ? parseInt(networkUtils.frequencyFromChannel(network.channel))
    : 0;
  network.signal_level = networkTmp[5]
    ? networkUtils.dBFromQuality(networkTmp[5].match(/.*?:\s(.*)/)[1])
    : Number.MIN_VALUE;
  network.quality = networkTmp[5]
    ? parseFloat(networkTmp[5].match(/.*?:\s(.*)/)[1])
    : 0;
  network.security = networkTmp[2] ? networkTmp[2].match(/.*?:\s(.*)/)[1] : '';
  network.security_flags = networkTmp[3]
    ? networkTmp[3].match(/.*?:\s(.*)/)[1]
    : '';
  network.mode = 'Unknown';

  return network;
}

function parseBssid(networkTmp, bssid) {
  var network = {};

  network.mac = bssid[0].match(/.*?:\s(.*)/)[1];
  network.bssid = network.mac;
  network.ssid = networkTmp[0].match(/.*?:\s(.*)/)[1];
  network.channel = parseInt(bssid[3].match(/.*?:\s(.*)/)[1]);
  network.frequency = parseInt(networkUtils.frequencyFromChannel(network.channel));
  network.signal_level = networkUtils.dBFromQuality(bssid[1].match(/.*?:\s(.*)/)[1]);
  network.quality = parseFloat(bssid[4].match(/.*?:\s(.*)/)[1]);
  network.security = networkTmp[2].match(/.*?:\s(.*)/)[1];
  network.security_flags = networkTmp[3].match(/.*?:\s(.*)/)[1];
  network.mode = 'Unknown';

  return network;
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
