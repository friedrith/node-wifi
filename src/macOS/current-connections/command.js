const command = () => ({
  cmd:
    '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport',
  args: ['--getinfo']
});

module.exports = command;
