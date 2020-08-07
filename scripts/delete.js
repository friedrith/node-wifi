const execute = require('../src/utils/executer');
const platform = require('../src/platform');

const { command } = platform().deleteConnection;

const { cmd, args } = command({ iface: 'en0' }, { ssid: 'SSID' });

console.log(`$ ${cmd} ${args.join(' ')}`);

execute({ cmd, args })
  .then(output => console.log(output))
  .catch(error => console.error(error));
