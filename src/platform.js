const linux = require('./linux/index');

module.exports = () => {
  let platform;

  switch (process.platform) {
    case 'linux':
      platform = linux;
      break;
    case 'darwin':
      break;
    case 'win32':
      break;
    default:
      throw new Error('ERROR : UNRECOGNIZED OS');
  }

  return platform;
};
