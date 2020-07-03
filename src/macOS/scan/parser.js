var networkUtils = require('../../network-utils.js');

const terms = {
  BSSID: 'BSSID',
  RSSI: 'RSSI',
  CHANNEL: 'CHANNEL',
  HT: 'HT',
  SECURITY: 'SECURITY',
  CC: 'CC'
};

const parse = stdout => {
  var lines = stdout.split('\n');
  var colMac = lines[0].indexOf(terms.BSSID);
  var colRssi = lines[0].indexOf(terms.RSSI);
  var colChannel = lines[0].indexOf(terms.CHANNEL);
  var colHt = lines[0].indexOf(terms.HT);
  var colSec = lines[0].indexOf(terms.SECURITY);
  //var colCC = lines[0].indexOf(terms.CC);

  var wifis = [];
  for (var i = 1, l = lines.length; i < l; i++) {
    var bssid = lines[i].substr(colMac, colRssi - colMac).trim();
    var securityFlags = lines[i].substr(colSec).trim();
    var security = 'none';
    if (securityFlags != 'NONE') {
      security = securityFlags.replace(/\(.*?\)/g, '');
      securityFlags = securityFlags.match(/\((.*?)\)/g);
    } else {
      security = 'none';
      securityFlags = [];
    }
    wifis.push({
      mac: bssid, // for retrocompatibility
      bssid: bssid,
      ssid: lines[i].substr(0, colMac).trim(),
      channel: parseInt(lines[i].substr(colChannel, colHt - colChannel)),
      frequency: parseInt(
        networkUtils.frequencyFromChannel(
          lines[i].substr(colChannel, colHt - colChannel).trim()
        )
      ),
      signal_level: lines[i].substr(colRssi, colChannel - colRssi).trim(),
      quality: networkUtils.dBFromQuality(
        lines[i].substr(colRssi, colChannel - colRssi).trim()
      ),
      security: security,
      security_flags: securityFlags
    });
  }
  wifis.pop();
  return wifis;
};

module.exports = parse;
