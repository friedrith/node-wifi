const promiser = require('../promiser');

const args = ['foo', 'bar'];

describe('promiser', () => {
  it('should execute function without error and return promise if no callback provided', async () => {
    const func = jest.fn(() => Promise.resolve('bar'));

    const result = await promiser(func, args, null);

    expect(func).toHaveBeenCalledWith(...args);
    expect(result).toEqual('bar');
  });

  it('should execute function with error and return promise if no callback provided', async () => {
    expect.assertions(2);

    const func = jest.fn(() => Promise.reject('error'));
    try {
      await promiser(func, args, null);
    } catch (error) {
      expect(func).toHaveBeenCalledWith(...args);
      expect(error).toEqual('error');
    }
  });

  it('should execute function without error and call callback', done => {
    const func = jest.fn(() => Promise.resolve('bar'));

    promiser(func, args, (error, result) => {
      expect(func).toHaveBeenCalledWith(...args);
      expect(result).toEqual('bar');
      done();
    });
  });

  it('should execute function with error and return promise if no callback provided', done => {
    const func = jest.fn(() => Promise.reject('error'));
    promiser(func, args, error => {
      expect(func).toHaveBeenCalledWith(...args);
      expect(error).toEqual('error');
      done();
    });
  });
});
