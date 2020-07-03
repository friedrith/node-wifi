const promiser = require('../promiser');

const config = { foo: 'foo' };

describe('promiser', () => {
  it('should execute function without error and return promise if no callback provided', async () => {
    const func = jest.fn(() => Promise.resolve('bar'));

    const result = await promiser(func)(config)();

    expect(func).toHaveBeenCalledWith(config);
    expect(result).toEqual('bar');
  });

  it('should execute function with error and return promise if no callback provided', async () => {
    expect.assertions(2);

    const func = jest.fn(() => Promise.reject('error'));
    try {
      await promiser(func)(config)();
    } catch (error) {
      expect(func).toHaveBeenCalledWith(config);
      expect(error).toEqual('error');
    }
  });

  it('should execute function without error and call callback', done => {
    const func = jest.fn(() => Promise.resolve('bar'));

    promiser(func)(config)((error, result) => {
      expect(func).toHaveBeenCalledWith(config);
      expect(result).toEqual('bar');
      done();
    });
  });

  it('should execute function with error and return promise if no callback provided', done => {
    const func = jest.fn(() => Promise.reject('error'));
    promiser(func)(config)(error => {
      expect(func).toHaveBeenCalledWith(config);
      expect(error).toEqual('error');
      done();
    });
  });

  it('should execute function without error with all args and return promise if no callback provided', async () => {
    const func = jest.fn(() => Promise.resolve('bar'));
    const arg = { ssid: 'foo', password: 'bar' };

    const result = await promiser(func)(config)(arg);

    expect(func).toHaveBeenCalledWith(config, arg);
    expect(result).toEqual('bar');
  });

  it('should execute function without error and call callback', done => {
    const func = jest.fn(() => Promise.resolve('bar'));
    const arg = { ssid: 'foo', password: 'bar' };

    promiser(func)(config)(arg, (error, result) => {
      expect(func).toHaveBeenCalledWith(config, arg);
      expect(result).toEqual('bar');
      done();
    });
  });
});
