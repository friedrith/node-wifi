const execute = require('../src/utils/executer');
const platform = require('../src/platform');

const { command } = platform().getCurrentConnections;
const { cmd, args } = command();

console.log(`$ ${cmd} ${args.join(' ')}`);

execute({ cmd, args })
  .then(output => console.log(output))
  .catch(error => console.error(error));
