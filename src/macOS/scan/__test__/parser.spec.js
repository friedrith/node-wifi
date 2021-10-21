const path = require('path');
const unlog = require('../../../__test__/unlogger');
const parse = require('../parser');

const log = filename => path.resolve(__dirname, '../__logs__/', filename);

describe('parse macOS scan output', () => {
  it('should return wifi networks', async () => {
    const output = await unlog(log('scan-01.log'));

    const networks = parse(output);

    expect(networks).toEqual([
      {
        mac: 'f6:d1:6d:b3:d2:88',
        bssid: 'f6:d1:6d:b3:d2:88',
        ssid: 'foo-bar',
        channel: 6,
        frequency: 2437,
        quality: 28,
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
        quality: 28,
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
        quality: 90,
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
        quality: 72,
        signal_level: '-64',
        security: 'WPA WPA2',
        security_flags: ['(PSK/TKIP,AES/TKIP)', '(PSK/TKIP,AES/TKIP)']
      }
    ]);
  });

  it('should return wifi networks with shifted lines', async () => {
    const output = await unlog(log('scan-shifted.log'));

    const networks = parse(output);

    expect(networks).toEqual([
      {
        mac: '18:ff:7b:43:b5:26',
        bssid: '18:ff:7b:43:b5:26',
        ssid: 'NERMNET',
        channel: 149,
        frequency: 5745,
        quality: 72,
        signal_level: '-64',
        security: 'WPA WPA2',
        security_flags: ['(PSK/TKIP,AES/TKIP)', '(PSK/TKIP,AES/TKIP)']
      },
      {
        mac: '12:23:03:18:9f:1c',
        bssid: '12:23:03:18:9f:1c',
        ssid: 'Linksys02787-invité',
        channel: 11,
        frequency: 2462,
        quality: 134,
        signal_level: '-33',
        security: 'NONE',
        security_flags: []
      },
      {
        mac: '10:23:03:1a:9f:1c',
        bssid: '10:23:03:1a:9f:1c',
        ssid: 'Linksys02787',
        channel: 11,
        frequency: 2462,
        quality: 134,
        signal_level: '-33',
        security: 'WPA2',
        security_flags: ['(PSK/AES/AES)']
      },
      {
        mac: '18:ff:7b:43:b5:27',
        bssid: '18:ff:7b:43:b5:27',
        ssid: 'NERMNET',
        channel: 1,
        frequency: 2412,
        quality: 94,
        signal_level: '-53',
        security: 'WPA2',
        security_flags: ['(PSK/TKIP,AES/TKIP)']
      }
    ]);
  });

  it('should return wifi networks with space in ssid', async () => {
    const output = await unlog(log('scan-space.log'));

    const networks = parse(output);

    expect(networks).toEqual([
      {
        mac: '10:23:03:1a:9f:1c',
        bssid: '10:23:03:1a:9f:1c',
        ssid: 'Linksys02787',
        channel: 11,
        frequency: 2462,
        quality: 134,
        signal_level: '-33',
        security: 'WPA2',
        security_flags: ['(PSK/AES/AES)']
      },
      {
        mac: '1e:27:e2:fa:c6:32',
        bssid: '1e:27:e2:fa:c6:32',
        ssid: 'Terminus 1',
        channel: 4,
        frequency: 2427,
        quality: 148,
        signal_level: '-26',
        security: 'WPA2',
        security_flags: ['(PSK/AES/AES)']
      },
      {
        mac: '10:23:03:1a:9f:1d',
        bssid: '10:23:03:1a:9f:1d',
        ssid: 'Linksys02787_5GHz',
        channel: 36,
        frequency: 5180,
        quality: 98,
        signal_level: '-51',
        security: 'WPA2',
        security_flags: ['(PSK/AES/AES)']
      }
    ]);
  });

  it('should return wifi networks on macOS Monterey', async () => {
    const output = await unlog(log('scan-monterey.log'));

    const networks = parse(output);

    expect(networks).toEqual([
      {
        mac: '',
        bssid: '',
        ssid: 'XXXX-AMPLIFI',
        channel: 36,
        frequency: 5180,
        quality: 38,
        signal_level: '-81',
        security: 'WPA2',
        security_flags: ['(PSK/AES/AES)']
      },
      {
        mac: '',
        bssid: '',
        ssid: 'XXXX-AMPLIFI',
        channel: 36,
        frequency: 5180,
        quality: 70,
        signal_level: '-65',
        security: 'WPA2',
        security_flags: ['(PSK/AES/AES)']
      },
      {
        mac: '',
        bssid: '',
        ssid: 'XXXX-2.4GHz',
        channel: 11,
        frequency: 2462,
        quality: 146,
        signal_level: '-27',
        security: 'WPA WPA2',
        security_flags: ['(PSK/TKIP,AES/TKIP)', '(PSK/TKIP,AES/TKIP)']
      },
      {
        mac: '',
        bssid: '',
        ssid: 'XXXX-5GHz',
        channel: 149,
        frequency: 5745,
        quality: 134,
        signal_level: '-33',
        security: 'WPA WPA2',
        security_flags: ['(PSK/TKIP,AES/TKIP)', '(PSK/TKIP,AES/TKIP)']
      }
    ]);
  });
});
