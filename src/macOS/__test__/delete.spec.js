const path = require('path');

const { command, parse } = require('../delete');

const unlog = require('../../__test__/unlogger');

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

const log = filename => path.resolve(__dirname, '../__logs__/', filename);

describe('parse macOS delete output', () => {
  it('should throw error', async () => {
    const output = await unlog(log('delete-01.log'));

    expect(() => parse(output)).toThrow(
      'Network SSID was not found in the preferred networks list'
    );
  });
});
