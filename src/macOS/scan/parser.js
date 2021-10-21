const xml2js = require('xml2js');

const { percentageFromDB } = require('../../utils/percentage-db');
const frequencyFromChannel = require('../../utils/frequency-from-channel');

const parseNetwork = network => {
  const values = [
    ...network.dict,
    ...network.integer.map(parseInt),
    ...network.string,
    ...network.data
  ];

  return network.key.reduce(
    (acc, key, index) => ({ ...acc, [key]: values[index] }),
    {}
  );
};

const parse = xml =>
  xml2js
    .parseStringPromise(xml)
    .then(data => data.plist.array)
    .then(data => data['0'].dict)
    // .then(data => data.map(parseNetwork))
    .then(data => {
      console.log(data);
      return data;
    });

/*
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
        const [
          ,
          ssid,
          bssid,
          rssi,
          channelStr,
          // eslint-disable-next-line no-unused-vars
          ht,
          // eslint-disable-next-line no-unused-vars
          countryCode,
          security
        ] = match;

        const channel = parseInt(channelStr);

        return {
          mac: bssid, // for retrocompatibility
          bssid,
          ssid,
          channel,
          frequency: frequencyFromChannel(channel),
          signal_level: rssi,
          quality: percentageFromDB(rssi),
          ...parseSecurity(security)
        };
      }

      return false;
    })
    .filter(Boolean);

  return networks;
};

*/

module.exports = parse;
