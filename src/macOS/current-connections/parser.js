const { percentageFromDB } = require('../../utils/percentage-db');
const frequencyFromChannel = require('../../utils/frequency-from-channel');

const agrCtlRSSIRegex = /[ ]*agrCtlRSSI: (.*)/;
const BSSIDRegex = /[ ]*BSSID: ([0-9A-Fa-f:]*)/;
const SSIDRegex = /[ ]*SSID: (.*)/;
const securityRegex = /[ ]*link auth: (.*)/;
const channelRegex = /[ ]*channel: (.*)/;

const formatMacAddress = mac =>
  mac
    .split(':')
    .map(part => (part.length === 1 ? '0' + part : part))
    .join(':');

const parse = stdout => {
  const lines = stdout.split('\n');

  const connections = [];
  let connection = {};
  lines.forEach(line => {
    const matchAgrCtlRSSI = line.match(agrCtlRSSIRegex);
    if (matchAgrCtlRSSI) {
      connection.signal_level = parseInt(matchAgrCtlRSSI[1]);
      connection.quality = percentageFromDB(connection.signal_level);
      return;
    }

    const matchBSSID = line.match(BSSIDRegex);
    if (matchBSSID) {
      connection.bssid = formatMacAddress(matchBSSID[1]);
      connection.mac = connection.bssid; // for retrocompatibility
      return;
    }

    const matchSSID = line.match(SSIDRegex);
    if (matchSSID) {
      connection.ssid = matchSSID[1];
      return;
    }

    const matchSecurity = line.match(securityRegex);
    if (matchSecurity) {
      connection.security = matchSecurity[1];
      connection.security_flags = [];
      return;
    }

    const matchChannel = line.match(channelRegex);
    if (matchChannel) {
      connection.channel = matchChannel[1];
      connection.frequency = frequencyFromChannel(connection.channel);
      connections.push(connection);
      connection = {};
      return;
    }
  });

  return connections;
};

module.exports = parse;
