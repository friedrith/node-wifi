const executeCommand = require('./utils/execute-command');
const promiser = require('./utils/promiser');
const extractCallback = require('./utils/extract-callback');

const platform = require('./platform');

let config = {
  debug: false,
  iface: null
};

const init = newConfig => {
  config = {
    ...config,
    ...newConfig
  };
};

const notAvailable = () => {
  throw new Error('ERROR : not available for this OS');
};

const defaultParse = foo => foo;

const feature = featureName => (...allArgs) => {
  if (!platform()[featureName]) {
    notAvailable();
  }

  const { allInOne, command, parse = defaultParse } = platform()[featureName];

  if (allInOne) {
    // for windows
    return allInOne(config)(...allArgs);
  }

  const func = (...args) =>
    executeCommand(command(config, ...args)).then(parse);

  const { callback, args } = extractCallback(allArgs);

  return promiser(func, args, callback);
};

module.exports = {
  init,
  scan: feature('scan'),
  connect: feature('connect'),
  deleteConnection: feature('deleteConnection'),
  getCurrentConnections: feature('getCurrentConnections'),
  disconnect: feature('disconnect')
};
