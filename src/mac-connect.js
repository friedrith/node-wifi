const execute = require('./utils/executer');
const promiser = require('./utils/promiser');
const connectWifiCommand = require('./macOS/connect/command.js');

const connectWifi = (config, accessPoint) =>
  execute(connectWifiCommand(config, accessPoint));

module.exports = promiser(connectWifi);
