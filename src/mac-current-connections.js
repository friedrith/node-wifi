const execute = require('./utils/executer');
const promiser = require('./utils/promiser');
const command = require('./macOS/current-connections/command.js');
const parse = require('./macOS/current-connections/parser');

const currentConnectionWifi = config =>
  execute(command(config)).then(output => parse(output));

module.exports = promiser(currentConnectionWifi);
