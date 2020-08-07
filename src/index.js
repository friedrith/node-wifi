const execute = require('./utils/executer');
const promiser = require('./utils/promiser');

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

const notAvailable = () => throw new Error('ERROR : not available for this OS');

const scan = () => {
  if (!platform().scan) {
    notAvailable();
  }

  const { command, parse } = platform().scan;

  const scanWifi = config =>
    execute(command(config)).then(output => parse(output));

  return promiser(scanWifi)(config)();
};

const connect = accessPoint => {
  if (!platform().connect) {
    notAvailable();
  }

  const { command, parse } = platform().connect;

  const connectWifi = config =>
    execute(command(config)).then(output => parse(output));

  return promiser(connectWifi)(config)(accessPoint);
};

module.exports = {
  init,
  scan,
  connect
};
