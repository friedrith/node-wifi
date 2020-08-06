const execute = require('../src/utils/executer');
const platform = require('../src/platform');

const { command } = platform().scan;

const { cmd, args } = command({ iface: null });

console.log(`$ ${cmd} ${args.join(' ')}`);

execute({ cmd, args })
  .then(output => console.log(output))
  .catch(error => console.error(error));
