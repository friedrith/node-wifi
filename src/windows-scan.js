const execFile = require('child_process').execFile;
const networkUtils = require('./utils/network-utils');
const env = require('./env');

function scanWifi(config, callback) {
  try {
    execFile(
      'netsh',
      ['wlan', 'show', 'networks', 'mode=Bssid'],
      { env },
      (err, scanResults) => {
        if (err) {
          callback && callback(err);
          return;
        }

        scanResults = scanResults
          .toString('utf8')
          .split('\r')
          .join('')
          .split('\n')
          .slice(4, scanResults.length);

        let numNetworks = -1;
        let currentLine = 0;
        let networkTmp;
        const networksTmp = [];
        let network;
        const networks = [];
        let i;

        for (i = 0; i < scanResults.length; i++) {
          if (scanResults[i] === '') {
            numNetworks++;
            networkTmp = scanResults.slice(currentLine, i);
            networksTmp.push(networkTmp);
            currentLine = i + 1;
          }
        }

        for (i = 0; i < numNetworks; i++) {
          // skip empty networks
          if (networksTmp[i] && networksTmp[i].length > 0) {
            network = parse(networksTmp[i]);
            networks.push(network);
          }
        }

        callback && callback(null, networks);
      }
    );
  } catch (e) {
    callback && callback(e);
  }
}

function parse(networkTmp) {
  const network = {};

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

module.exports = config => {
  return callback => {
    if (callback) {
      scanWifi(config, callback);
    } else {
      return new Promise((resolve, reject) => {
        scanWifi(config, (err, networks) => {
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
