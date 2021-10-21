const command = () => ({
  cmd: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport',
  args: ['--scan', '--xml']
});

module.exports = command;
