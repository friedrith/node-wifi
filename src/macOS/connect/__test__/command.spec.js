const command = require('../command');

describe('mac Os connect command', () => {
  it('should generate command with default interface', () => {
    const config = { iface: null };
    const accessPoint = { ssid: 'foo', password: 'bar' };

    expect(command(config, accessPoint)).toEqual({
      cmd: '/usr/sbin/networksetup',
      args: ['-setairportnetwork', 'en0', 'foo', 'bar']
    });
  });

  it('should generate command with configured interface', () => {
    const config = { iface: 'en2' };
    const accessPoint = { ssid: 'foo', password: 'bar' };

    expect(command(config, accessPoint)).toEqual({
      cmd: '/usr/sbin/networksetup',
      args: ['-setairportnetwork', 'en2', 'foo', 'bar']
    });
  });
});
