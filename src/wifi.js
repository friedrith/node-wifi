const windowsConnect = require('./windows-connect.js');
const windowsScan = require('./windows-scan.js');
const windowsDisconnect = require('./windows-disconnect.js');
const windowsGetCurrentConnections = require('./windows-current-connections');
const linuxConnect = require('./linux-connect');
const linuxDisconnect = require('./linux-disconnect');
const linuxDelete = require('./linux-delete');
const linuxGetCurrentConnections = require('./linux-current-connections');
const linuxScan = require('./linux-scan.js');
const macConnect = require('./mac-connect.js');
const macScan = require('./mac-scan.js');
const macDelete = require('./mac-delete');
const macGetCurrentConnections = require('./mac-current-connections');

const config = {
  debug: false,
  iface: null
};

function init(options) {
  if (options && options.debug) {
    config.debug = options.debug;
  }

  if (options && options.iface) {
    config.iface = options.iface;
  }

  let scan = () => {
    throw new Error('ERROR : not available for this OS');
  };
  let connect = () => {
    throw new Error('ERROR : not available for this OS');
  };
  let disconnect = () => {
    throw new Error('ERROR : not available for this OS');
  };
  let deleteConnection = () => {
    throw new Error('ERROR : not available for this OS');
  };
  let getCurrentConnections = () => {
    throw new Error('ERROR : not available for this OS');
  };

  switch (process.platform) {
    case 'linux':
      connect = linuxConnect(config);
      scan = linuxScan(config);
      disconnect = linuxDisconnect(config);
      deleteConnection = linuxDelete(config);
      getCurrentConnections = linuxGetCurrentConnections(config);
      break;
    case 'darwin':
      connect = macConnect(config);
      scan = macScan(config);
      deleteConnection = macDelete(config);
      getCurrentConnections = macGetCurrentConnections(config);
      break;
    case 'win32':
      connect = windowsConnect(config);
      scan = windowsScan(config);
      disconnect = windowsDisconnect(config);
      getCurrentConnections = windowsGetCurrentConnections(config);
      break;
    default:
      throw new Error('ERROR : UNRECOGNIZED OS');
  }
  exports.scan = scan;
  exports.connect = connect;
  exports.disconnect = disconnect;
  exports.deleteConnection = deleteConnection;
  exports.getCurrentConnections = getCurrentConnections;
}

exports.init = init;
exports.scan = () => {
  throw new Error('ERROR : use init before');
};

exports.connect = () => {
  throw new Error('ERROR : use init before');
};

exports.disconnect = () => {
  throw new Error('ERROR : use init before');
};

exports.getCurrentConnections = () => {
  throw new Error('ERROR : use init before');
};

exports.deleteConnection = () => {
  throw new Error('ERROR : use init before');
};
