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

        const ssids = scanResults.toString('utf8').split(/^SSID .* : /gmi);
        ssids.shift();

        const networks = ssids.map(ssidText => {
          const bssidsText = ssidText.toString('utf8').replace(/\r/gi, '').split(/^\s+BSSID .* : /gmi);

          const ssid = bssidsText[0].split('\n')[0];
          const network = bssidsText[0].replace(/\r/gi, '').split('\n');
          const authentication = network[2].match(/.*?:\s(.*)/)[1];
          const encryption = network[3].match(/.*?:\s(.*)/)[1];
          //const networkType = network[1].match(/.*?:\s(.*)/)[1];

          bssidsText.shift();
          const bssids = bssidsText.map(bssidText => {
            const bssid = bssidText.split('\n');
            const mac = bssid[0];
            const signal = bssid[1].match(/.*?:\s(.*)/)[1];
            const channel = bssid[3].match(/.*?:\s(.*)/)[1];
            //const radioType = bssid[2].match(/.*?:\s(.*)/)[1];
            //const basicRates = bssid[4].match(/.*?:\s(.*)/)[1];
            //const otherRates = bssid[5].match(/.*?:\s(.*)/)[1];

            return {
              ssid,
              mac,
              bssid: mac,
              channel: Number(channel),
              frequency: channel ? parseInt(networkUtils.frequencyFromChannel(channel)) : 0,
              signal_level: signal ? networkUtils.dBFromQuality(signal) : Number.MIN_VALUE,
              quality: signal ? parseFloat(signal) : 0,
              security: authentication,
              security_flags: encryption,
              mode: 'Unknown',
            };
          })

          return bssids;
        })
        .reduce((current, array) => [...array, ...current], [])

        callback && callback(null, networks);
      }
    );
  } catch (e) {
    callback && callback(e);
  }
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
