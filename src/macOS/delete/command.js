const command = (config, accessPoint) => {
  const args = ['-removepreferredwirelessnetwork'];

  args.push(config.iface || 'en0');

  args.push(accessPoint.ssid);

  return {
    cmd: '/usr/sbin/networksetup',
    args
  };
};

module.exports = command;
