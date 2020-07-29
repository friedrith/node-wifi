const command = require('../command');

describe('mac Os delete connection command', () => {
  it('should generate basic command without iface', () => {
    const config = { iface: null };
    const accessPoint = { ssid: 'ssid' };
    expect(command(config, accessPoint)).toEqual({
      cmd: '/usr/sbin/networksetup',
      args: ['-removepreferredwirelessnetwork', 'en0', 'ssid']
    });
  });

  it('should generate basic command without iface', () => {
    const config = { iface: 'en2' };
    const accessPoint = { ssid: 'ssid' };
    expect(command(config, accessPoint)).toEqual({
      cmd: '/usr/sbin/networksetup',
      args: ['-removepreferredwirelessnetwork', 'en2', 'ssid']
    });
  });
});
