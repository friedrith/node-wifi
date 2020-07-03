const getCommand = () => ({
  cmd:
    '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport',
  args: ['-s']
});

module.exports = getCommand;
