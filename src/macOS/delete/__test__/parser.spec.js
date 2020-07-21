const path = require('path');
const unlog = require('../../../__test__/unlogger');
const parse = require('../parser');

const log = filename => path.resolve(__dirname, `../__logs__/`, filename);

describe('parse macOS delete output', () => {
  it('should throw error', async () => {
    const output = await unlog(log('delete-01.log'));

    expect(() => parse(output)).toThrow(
      'Network SSID was not found in the preferred networks list'
    );
  });
});
