const linux = require('./linux');
const macOS = require('./macOS');
const windows = require('./windows');

module.exports = () => {
  let platform;

  switch (process.platform) {
    case 'linux':
      platform = linux;
      break;
    case 'darwin':
      platform = macOS;
      break;
    case 'win32':
      platform = windows;
      break;
    default:
      throw new Error('ERROR : UNRECOGNIZED OS');
  }

  return platform;
};
