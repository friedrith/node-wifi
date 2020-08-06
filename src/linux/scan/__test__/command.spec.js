const command = require('../command');

describe('linux scan command', () => {
  it('should generate basic command without iface', () => {
    expect(command({ iface: null })).toEqual({
      cmd: 'nmcli',
      args: [
        '--terse',
        '--fields',
        'active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags',
        'device',
        'wifi',
        'list'
      ]
    });
  });

  it('should generate basic command with iface', () => {
    expect(command({ iface: 'wlan0' })).toEqual({
      cmd: 'nmcli',
      args: [
        '--terse',
        '--fields',
        'active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags',
        'device',
        'wifi',
        'list',
        'ifname',
        'wlan0'
      ]
    });
  });
});
