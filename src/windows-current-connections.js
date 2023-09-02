const execFile = require('child_process').execFile;
const env = require('./env');
const networkUtils = require('./utils/network-utils.js');

function parseShowInterfaces(stdout) {
  let connections = [];
  // The package does not use the keys returned by netsh, this object helps the conversion
  const fields = {
    // "Interface type"
    Name: 'name',
    Description: 'description',
    GUID: 'guid',
    'Physical address': 'mac',
    'Interface type': 'interfaceType',
    State: 'state',
    SSID: 'ssid',
    BSSID: 'bssid',
    'Network type': 'mode',
    'Radio type': 'radio',
    Authentication: 'authentication',
    Cipher: 'encryption',
    'Connection mode': 'connection',
    Band: 'band',
    Channel: 'channel',
    'Receive rate (Mbps)': 'reception',
    'Transmit rate (Mbps)': 'transmission',
    Signal: 'signal',
    Profile: 'profil'
  };

  // Group stdout by interfaces based on the spaces in the output (empty lines)
  let groups = [];
  let currentGroup = 0;
  let data = stdout.trim().split('\r\n');
  data.forEach(line => {
    line = line.trim();
    if (line === '') {
      currentGroup++;
    } else {
      let items = [];
      if (groups[currentGroup]) {
        items = groups[currentGroup];
      }
      items.push(line);
      groups[currentGroup] = items;
    }
  });
  groups = groups.filter(group => group.length > 1);

  // Parse each group
  connections = groups.map(group => {
    let tmpConnection = {};
    group.forEach(line => {
      const parts = line.split(' :').map(part => part.trim());
      const key = fields[parts[0]];
      tmpConnection[key] = parts[1];
    });

    // This is the original object returned
    let connection = {
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
    };

    return connection;
  });

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
