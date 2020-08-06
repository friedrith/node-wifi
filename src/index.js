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

const scan = () => {
  if (!platform().scan) {
    throw new Error('ERROR : not available for this OS');
  }

  const { command, parse } = platform().scan;

  const scanWifi = config =>
    execute(command(config)).then(output => parse(output));

  return promiser(scanWifi);
};

module.exports = {
  init,
  scan
};
