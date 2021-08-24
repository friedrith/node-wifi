const command = (config, accessPoint) => {
  const args = ['-removepreferredwirelessnetwork'];

  args.push(config.iface || 'en0');

  args.push(accessPoint.ssid);

  return {
    cmd: '/usr/sbin/networksetup',
    args
  };
};

const parse = stdout => {
  if (
    stdout &&
    stdout.includes('was not found in the preferred networks list')
  ) {
    throw new Error(stdout.trim());
  }
};

module.exports = { command, parse };
