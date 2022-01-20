const os = require('os');
const execFile = require('child_process').execFile;
const env = require('./env');
const networkUtils = require('./utils/network-utils.js');

function isWin11() {
  const winMajor = os.release().split('.')[0];
  const winMinor = os.release().split('.')[1];
  const winBuild = os.release().split('.')[2];
  return winMajor >= 10 && winMinor >= 0 && winBuild >= 22000;
}

function parseShowInterfaces(stdout) {
  const lines = stdout.split('\r\n');
  const numberOfLines = isWin11() ? 20 : 18;
  const connections = [];
  let i = 3;
  while (lines.length > i + numberOfLines) {
    const tmpConnection = {};
    const fields = isWin11()
      ? [
          'name',
          'description',
          'guid',
          'mac',
          'ifaceType',
          'state',
          'ssid',
          'bssid',
          'mode',
          'radio',
          'authentication',
          'encryption',
          'connection',
          'band',
          'channel',
          'reception',
          'transmission',
          'signal',
          'profile'
        ]
      : [
          // else Windows 10
          'name',
          'description',
          'guid',
          'mac',
          'state',
          'ssid',
          'bssid',
          'mode',
          'radio',
          'authentication',
          'encryption',
          'connection',
          'channel',
          'reception',
          'transmission',
          'signal',
          'profile'
        ];
    for (let j = 0; j < fields.length; j++) {
      const line = lines[i + j];
      tmpConnection[fields[j]] = line.match(/.*: (.*)/)[1];
    }

    connections.push({
      iface: tmpConnection.name,
      ssid: tmpConnection.ssid,
      bssid: tmpConnection.bssid,
      mac: tmpConnection.bssid,
      mode: tmpConnection.mode,
      channel: parseInt(tmpConnection.channel),
      frequency: parseInt(
        networkUtils.frequencyFromChannel(parseInt(tmpConnection.channel))
      ),
      signal_level: networkUtils.dBFromQuality(tmpConnection.signal),
      quality: parseFloat(tmpConnection.signal),
      security: tmpConnection.authentication,
      security_flags: tmpConnection.encryption
    });

    i = i + numberOfLines;
  }

  return connections;
}

function getCurrentConnection(config, callback) {
  const params = ['wlan', 'show', 'interfaces'];
  execFile('netsh', params, { env }, (err, stdout) => {
    if (err) {
      callback && callback(err);
    } else {
      try {
        const connections = parseShowInterfaces(stdout, config);
        callback && callback(null, connections);
      } catch (e) {
        callback && callback(e);
      }
    }
  });
}

module.exports = config => {
  return callback => {
    if (callback) {
      getCurrentConnection(config, callback);
    } else {
      return new Promise((resolve, reject) => {
        getCurrentConnection(config, (err, connections) => {
          if (err) {
            reject(err);
          } else {
            resolve(connections);
          }
        });
      });
    }
  };
};
