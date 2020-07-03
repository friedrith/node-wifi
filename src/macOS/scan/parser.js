var networkUtils = require('../../network-utils.js');

const isNotEmpty = line => line.trim() !== '';

const parseSecurity = security => {
  const securities =
    security === 'NONE'
      ? [{ protocole: 'NONE', flag: '' }]
      : security
          .split(' ')
          .map(s => s.match(/(.*)\((.*)\)/))
          .filter(Boolean)
          .map(([, protocole, flag]) => ({
            protocole,
            flag
          }));

  return {
    security: securities.map(s => s.protocole).join(' '),
    security_flags: securities.filter(s => s.flag).map(s => `(${s.flag})`)
  };
};

const parse = stdout => {
  const lines = stdout.split('\n');

  const [, ...otherLines] = lines;

  const networks = otherLines
    .filter(isNotEmpty)
    .map(line => line.trim())
    .map(line => {
      const match = line.match(
        /(.*)\s+([a-zA-Z0-9]{2}:[a-zA-Z0-9]{2}:[a-zA-Z0-9]{2}:[a-zA-Z0-9]{2}:[a-zA-Z0-9]{2}:[a-zA-Z0-9]{2})\s+(-[0-9]+)\s+([0-9]+).*\s+([A-Z]+)\s+([a-zA-Z-]+)\s+([A-Z0-9(,)\s/]+)/
      );

      if (match) {
        // eslint-disable-next-line no-unused-vars
        const [, ssid, bssid, rssi, channel, ht, countryCode, security] = match;

        return {
          mac: bssid, // for retrocompatibility
          bssid: bssid,
          ssid,
          channel: parseInt(channel),
          frequency: parseInt(networkUtils.frequencyFromChannel(channel)),
          signal_level: rssi,
          quality: networkUtils.dBFromQuality(rssi),
          ...parseSecurity(security)
        };
      }

      return false;
    })
    .filter(Boolean);

  return networks;
};

module.exports = parse;
