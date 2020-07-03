const { percentageFromDB, dBFromPercentage } = require('../percentage-db');

describe('qualityFromDB', () => {
  it('should return quality when dB is string', () => {
    expect(percentageFromDB('-86')).toEqual(28);
  });
});

describe('dBFromQuality', () => {
  it('should return dB when quality is string', () => {
    expect(dBFromPercentage('28')).toEqual(-86);
  });
});
