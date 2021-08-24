const { dBFromPercentage } = require('../utils/percentage-db');
const matchBssid = require('../utils/match-bssid');

const command = config => {
  const args = [
    '--terse',
    '--fields',
    'active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags',
    'device',
    'wifi',
    'list'
  ];

  if (config.iface) {
    args.push('ifname');
    args.push(config.iface);
  }

  return {
    cmd: 'nmcli',
    args
  };
};

const parse = stdout =>
  stdout
    .split('\n')
    .filter(line => line !== '' && line.includes(':'))
    .filter(line => matchBssid(line))
    .map(line => {
      const match = matchBssid(line);
      const bssid = match[0].replace(/\\:/g, ':');

      const fields = line.replace(match[0]).split(':');

      const [
        // eslint-disable-next-line no-unused-vars
        active,
        ssid,
        // eslint-disable-next-line no-unused-vars
        bssidAlreadyProcessed,
        mode,
        channel,
        frequency,
        quality,
        security,
        security_flags_wpa,
        security_flags_rsn
      ] = fields;

      return {
        ssid,
        bssid,
        mac: bssid, // for retrocompatibility with version 1.x
        mode,
        channel: parseInt(channel),
        frequency: parseInt(frequency),
        signal_level: dBFromPercentage(quality),
        quality: parseInt(quality),
        security: security !== '(none)' ? security : 'none',
        security_flags: {
          wpa: security_flags_wpa,
          rsn: security_flags_rsn
        }
      };
    });

module.exports = { command, parse };
