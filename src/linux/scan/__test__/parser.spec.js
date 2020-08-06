const path = require('path');
const unlog = require('../../../__test__/unlogger');
const parse = require('../parser');

const log = filename => path.resolve(__dirname, `../__logs__/`, filename);

describe('parse linux scan output', () => {
  it('should return wifi networks', async () => {
    const output = await unlog(log('scan-01.log'));

    const networks = parse(output);

    expect(networks).toEqual([
      {
        ssid: 'Linksys01777',
        bssid: '31:23:03:1A:9F:1C',
        mac: '31:23:03:1A:9F:1C',
        mode: 'Infra',
        channel: 11,
        frequency: 2462,
        signal_level: -50,
        quality: 100,
        security: 'WPA2',
        security_flags: { wpa: '(none)', rsn: 'pair_ccmp group_ccmp psk' }
      },
      {
        ssid: 'Linksys01777-invité',
        bssid: '31:23:03:18:9F:1C',
        mac: '31:23:03:18:9F:1C',
        mode: 'Infra',
        channel: 11,
        frequency: 2462,
        signal_level: -50,
        quality: 100,
        security: '',
        security_flags: { wpa: '(none)', rsn: '(none)' }
      },
      {
        ssid: 'EBOX_6070',
        bssid: '00:21:6A:75:60:22',
        mac: '00:21:6A:75:60:22',
        mode: 'Infra',
        channel: 11,
        frequency: 2462,
        signal_level: -50,
        quality: 100,
        security: 'WPA1 WPA2',
        security_flags: {
          wpa: 'pair_tkip pair_ccmp group_tkip psk',
          rsn: 'pair_tkip pair_ccmp group_tkip psk'
        }
      },
      {
        ssid: 'Linksys01777_5GHz',
        bssid: '31:23:03:1A:9F:1D',
        mac: '31:23:03:1A:9F:1D',
        mode: 'Infra',
        channel: 36,
        frequency: 5180,
        signal_level: -62.5,
        quality: 75,
        security: 'WPA2',
        security_flags: { wpa: '(none)', rsn: 'pair_ccmp group_ccmp psk' }
      },
      {
        ssid: 'NERMNET',
        bssid: '61:FF:7B:43:B5:27',
        mac: '61:FF:7B:43:B5:27',
        mode: 'Infra',
        channel: 1,
        frequency: 2412,
        signal_level: -68,
        quality: 64,
        security: 'WPA2',
        security_flags: {
          wpa: '(none)',
          rsn: 'pair_tkip pair_ccmp group_tkip psk'
        }
      },
      {
        ssid: 'NERMNET',
        bssid: '61:FF:7B:43:B5:26',
        mac: '61:FF:7B:43:B5:26',
        mode: 'Infra',
        channel: 149,
        frequency: 5745,
        signal_level: -68,
        quality: 64,
        security: 'WPA1 WPA2',
        security_flags: {
          wpa: 'pair_tkip pair_ccmp group_tkip psk',
          rsn: 'pair_tkip pair_ccmp group_tkip psk'
        }
      },
      {
        ssid: 'VIRGIN172',
        bssid: 'B1:EE:0E:E4:FA:1E',
        mac: 'B1:EE:0E:E4:FA:1E',
        mode: 'Infra',
        channel: 6,
        frequency: 2437,
        signal_level: -69,
        quality: 62,
        security: 'WPA2',
        security_flags: { wpa: '(none)', rsn: 'pair_ccmp group_ccmp psk' }
      },
      {
        ssid: 'NERMNET',
        bssid: '91:48:27:4B:7C:5A',
        mac: '91:48:27:4B:7C:5A',
        mode: 'Infra',
        channel: 13,
        frequency: 2472,
        signal_level: -72.5,
        quality: 55,
        security: 'WPA1 WPA2',
        security_flags: {
          wpa: 'pair_tkip pair_ccmp group_tkip psk',
          rsn: 'pair_tkip pair_ccmp group_tkip psk'
        }
      },
      {
        ssid: 'VIRGIN660',
        bssid: 'D1:D7:75:A2:BC:F6',
        mac: 'D1:D7:75:A2:BC:F6',
        mode: 'Infra',
        channel: 6,
        frequency: 2437,
        signal_level: -73,
        quality: 54,
        security: 'WPA2',
        security_flags: { wpa: '(none)', rsn: 'pair_ccmp group_ccmp psk' }
      },
      {
        ssid: 'VIDEOTRON9021',
        bssid: 'A1:E4:CB:FB:42:38',
        mac: 'A1:E4:CB:FB:42:38',
        mode: 'Infra',
        channel: 11,
        frequency: 2462,
        signal_level: -80,
        quality: 40,
        security: 'WPA2',
        security_flags: { wpa: '(none)', rsn: 'pair_ccmp group_ccmp psk' }
      },
      {
        ssid: 'BELL320',
        bssid: 'A1:6A:BB:E9:FC:E7',
        mac: 'A1:6A:BB:E9:FC:E7',
        mode: 'Infra',
        channel: 44,
        frequency: 5220,
        signal_level: -85,
        quality: 30,
        security: 'WPA2',
        security_flags: { wpa: '(none)', rsn: 'pair_ccmp group_ccmp psk' }
      },
      {
        ssid: 'BELL320',
        bssid: 'A1:6A:BB:E9:FC:E5',
        mac: 'A1:6A:BB:E9:FC:E5',
        mode: 'Infra',
        channel: 100,
        frequency: 5500,
        signal_level: -85,
        quality: 30,
        security: 'WPA2',
        security_flags: { wpa: '(none)', rsn: 'pair_ccmp group_ccmp psk' }
      },
      {
        ssid: '',
        bssid: 'A1:6A:BB:E9:FC:E5',
        mac: 'A1:6A:BB:E9:FC:E5',
        mode: 'Infra',
        channel: 100,
        frequency: 5500,
        signal_level: -85,
        quality: 30,
        security: 'WPA2',
        security_flags: { wpa: '(none)', rsn: 'pair_ccmp group_ccmp psk' }
      },
      {
        ssid: 'BELL320',
        bssid: 'A1:6A:BB:E9:FC:E6',
        mac: 'A1:6A:BB:E9:FC:E6',
        mode: 'Infra',
        channel: 1,
        frequency: 2412,
        signal_level: -87.5,
        quality: 25,
        security: 'WPA2',
        security_flags: { wpa: '(none)', rsn: 'pair_ccmp group_ccmp psk' }
      }
    ]);
  });
});
