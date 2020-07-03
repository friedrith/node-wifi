const command = (config, accessPoint) => {
  const args = ['-setairportnetwork'];

  args.push(config.iface || 'en0');

  args.push(accessPoint.ssid);
  args.push(accessPoint.password);

  return {
    cmd: '/usr/sbin/networksetup',
    args
  };
};

module.exports = command;
