const path = require('path');
const unlog = require('../../../__test__/unlogger');
const parse = require('../parser');

const log = filename => path.resolve(__dirname, `../__logs__/`, filename);

describe('parse macOS get current connections output', () => {
  it('should return current wifi networks', async () => {
    const output = await unlog(log('current-connections-01.log'));

    const connections = parse(output);

    expect(connections).toEqual([
      {
        mac: '31:23:03:1a:9f:1d',
        bssid: '31:23:03:1a:9f:1d',
        ssid: 'Linksys01227_5GHz',
        channel: '36,80',
        frequency: 5180,
        quality: 100,
        signal_level: -50,
        security: 'wpa2-psk',
        security_flags: []
      }
    ]);
  });
});
