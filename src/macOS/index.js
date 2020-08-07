const scan = require('./scan');
const connect = require('./connect');
const getCurrentConnections = require('./current-connections');
const deleteConnection = require('./delete');

module.exports = { scan, connect, getCurrentConnections, deleteConnection };
