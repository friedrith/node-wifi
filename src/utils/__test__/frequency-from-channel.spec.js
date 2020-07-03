const frequencyFromChannel = require('../frequency-from-channel');

describe('frequencyFromChannel', () => {
  it('should return 2437Hz', () => {
    expect(frequencyFromChannel(6)).toEqual(2437);
  });

  it('should return 5180Hz', () => {
    expect(frequencyFromChannel(36)).toEqual(5180);
  });
});
