const execute = require('./utils/executer');
const promiser = require('./utils/promiser');
const command = require('./macOS/scan/command.js');
const parse = require('./macOS/scan/parser');

const scanWifi = config =>
  execute(command(config)).then(output => parse(output));

module.exports = promiser(scanWifi);
