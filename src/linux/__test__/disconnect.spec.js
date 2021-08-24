const { command } = require('../disconnect');

describe('linux disconnect command', () => {
  it('should generate basic command without iface', () => {
    const config = { iface: null };
    const accessPoint = { ssid: 'ssid', password: 'password' };

    expect(command(config, accessPoint)).toEqual({
      cmd: 'nmcli',
      args: ['device', 'disconnect']
    });
  });

  it('should generate basic command with iface', () => {
    const config = { iface: 'wlan0' };
    const accessPoint = { ssid: 'ssid', password: 'password' };

    expect(command(config, accessPoint)).toEqual({
      cmd: 'nmcli',
      args: ['device', 'disconnect', 'wlan0']
    });
  });
});
