const { command } = require('../delete');

describe('linux delete command', () => {
  it('should generate basic command without iface', () => {
    const config = { iface: null };
    const accessPoint = { ssid: 'ssid', password: 'password' };

    expect(command(config, accessPoint)).toEqual({
      cmd: 'nmcli',
      args: ['connection', 'delete', 'id', 'ssid']
    });
  });
});
