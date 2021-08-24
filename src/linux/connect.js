const command = (config, accessPoint) => {
  const args = [];
  args.push('-w');
  args.push('10');
  args.push('device');
  args.push('wifi');
  args.push('connect');
  args.push(accessPoint.ssid);
  args.push('password');
  args.push(accessPoint.password);

  if (config.iface) {
    args.push('ifname');
    args.push(config.iface);
  }

  return {
    cmd: 'nmcli',
    args
  };
};

module.exports = { command };
