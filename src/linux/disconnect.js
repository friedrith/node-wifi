const command = config => {
  const args = [];
  args.push('device');
  args.push('disconnect');

  if (config.iface) {
    args.push(config.iface);
  }

  return {
    cmd: 'nmcli',
    args
  };
};

module.exports = { command };
