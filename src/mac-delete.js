const execute = require('./utils/executer');
const promiser = require('./utils/promiser');
const command = require('./macOS/delete/command.js');
const parse = require('./macOS/delete/parser');

const disconnectWifi = (config, accessPoint) =>
  execute(command(config, accessPoint)).then(output => parse(output));

module.exports = promiser(disconnectWifi);
