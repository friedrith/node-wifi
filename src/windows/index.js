const connect = require('./connect');
const getCurrentConnections = require('./current-connections');
const disconnect = require('./disconnect');
const scan = require('./scan');
const deleteConnection = require('./delete');

module.exports = {
  connect: { allInOne: connect },
  getCurrentConnections: { allInOne: getCurrentConnections },
  disconnect: { allInOne: disconnect },
  scan: { allInOne: scan },
  deleteConnection
};
