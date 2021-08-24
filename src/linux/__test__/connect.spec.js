const { command } = require('../connect');

describe('linux connect command', () => {
  it('should generate basic command without iface', () => {
    const config = { iface: null };
    const accessPoint = { ssid: 'ssid', password: 'password' };

    expect(command(config, accessPoint)).toEqual({
      cmd: 'nmcli',
      args: [
        '-w',
        '10',
        'device',
        'wifi',
        'connect',
        'ssid',
        'password',
        'password'
      ]
    });
  });

  it('should generate basic command with iface', () => {
    const config = { iface: 'wlan0' };
    const accessPoint = { ssid: 'ssid', password: 'password' };

    expect(command(config, accessPoint)).toEqual({
      cmd: 'nmcli',
      args: [
        '-w',
        '10',
        'device',
        'wifi',
        'connect',
        'ssid',
        'password',
        'password',
        'ifname',
        'wlan0'
      ]
    });
  });
});
