const command = require('../command');

describe('mac Os get current connections command', () => {
  it('should generate basic command', () => {
    expect(command()).toEqual({
      cmd:
        '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport',
      args: ['--getinfo']
    });
  });
});
