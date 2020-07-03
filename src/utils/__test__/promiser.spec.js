const promiser = require('../promiser');

const config = { foo: 'foo' };

describe('promiser', () => {
  it('should execute function without error and return promise if no callback provided', async () => {
    const func = jest.fn((config, callback) => callback(null, 'bar'));

    const result = await promiser(func)(config)();

    expect(func).toHaveBeenCalledWith(config, expect.anything());
    expect(result).toEqual('bar');
  });

  it('should execute function with error and return promise if no callback provided', async () => {
    expect.assertions(2);

    const func = jest.fn((config, callback) => callback('error'));
    try {
      await promiser(func)(config)();
    } catch (error) {
      expect(func).toHaveBeenCalledWith(config, expect.anything());
      expect(error).toEqual('error');
    }
  });
});
