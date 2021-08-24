const command = (config, accessPoint) => {
  const args = [];
  args.push('wlan');
  args.push('delete');
  args.push('profile');
  args.push(accessPoint.ssid);

  return {
    cmd: 'netsh',
    args
  };
};

module.exports = { command };
