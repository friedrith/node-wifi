const extractCallback = require('../extract-callback');

const accessPoint = { ssid: 'ssid', password: 'password' };

describe('extract callback', () => {
  it('should return an object with callback', async () => {
    const func = jest.fn();

    const { args, callback } = extractCallback([accessPoint, func]);

    expect(args).toEqual([accessPoint]);
    expect(callback).toEqual(func);
  });

  it('should return an object with no callback', async () => {
    const { args, callback } = extractCallback([accessPoint]);

    expect(args).toEqual([accessPoint]);
    expect(callback).toEqual(null);
  });

  it('should return an object with 2 arguments', async () => {
    const arg2 = 'foo';

    const { args, callback } = extractCallback([accessPoint, arg2]);

    expect(args).toEqual([accessPoint, arg2]);
    expect(callback).toEqual(null);
  });
});
