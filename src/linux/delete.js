const command = (config, accessPoint) => {
  const args = [];
  args.push('connection');
  args.push('delete');
  args.push('id');

  args.push(accessPoint.ssid);

  return {
    cmd: 'nmcli',
    args
  };
};

module.exports = { command };
