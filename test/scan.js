const execute = require('../src/utils/executer');
const getCommand = require('../src/macOS/scan/command');

const { cmd, args } = getCommand();

console.log(`$ ${cmd} ${args.join(' ')}`);

execute(cmd, args)
  .then(output => console.log(output))
  .catch(error => console.error(error));
