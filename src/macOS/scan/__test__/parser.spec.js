const path = require('path');
const unlog = require('../../../__test__/unlogger');
const parse = require('../parser');

const log = filename => path.resolve(__dirname, `../__logs__/`, filename);

describe('parse macOS scan output', () => {
  it('should return right wifi networks', async () => {
    const output = await unlog(log('scan-01.log'));

    const networks = parse(output);

    expect(networks).toEqual([
      {
        mac: 'f6:d1:6d:b3:d2:88',
        bssid: 'f6:d1:6d:b3:d2:88',
        ssid: 'foo-bar',
        channel: 6,
        frequency: 2437,
        quality: -143,
        signal_level: '-86',
        security: 'WPA2',
        security_flags: ['(PSK/AES/AES)']
      },
      {
        mac: 'c1:ee:0e:e4:fa:1f',
        bssid: 'c1:ee:0e:e4:fa:1f',
        ssid: 'VIRGO1732',
        channel: 36,
        frequency: 5180,
        quality: -143,
        signal_level: '-86',
        security: 'WPA2',
        security_flags: ['(PSK/AES/AES)']
      },
      {
        mac: '34:e8:94:1e:fc:5c',
        bssid: '34:e8:94:1e:fc:5c',
        ssid: 'NERMNET',
        channel: 1,
        frequency: 2412,
        quality: -127.5,
        signal_level: '-55',
        security: 'WPA WPA2',
        security_flags: ['(PSK/AES,TKIP/TKIP)', '(PSK/AES,TKIP/TKIP)']
      },
      {
        mac: '45:ff:7b:43:b5:26',
        bssid: '45:ff:7b:43:b5:26',
        ssid: 'NERMNET',
        channel: 149,
        frequency: 5745,
        quality: -132,
        signal_level: '-64',
        security: 'WPA WPA2',
        security_flags: ['(PSK/TKIP,AES/TKIP)', '(PSK/TKIP,AES/TKIP)']
      }
    ]);
  });
});
