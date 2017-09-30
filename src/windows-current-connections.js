var exec = require('child_process').exec;
var env = require('./env');
var networkUtils = require('./network-utils.js');

module.exports = function (config) {
    function parseShowInterfaces (stdout) {
        var ifaces = stdout.split('\r\n\r\n');
        var connections = [];
        ifaces.forEach(function (iface) {
            var inputs = iface.split('\r\n');

            if (inputs.length > 0) {
                // 4 columns before identifiers, then 23 columns before :
                var connection = {
                    iface: null,          // Name
                    ssid: null,           // SSID
                    mac: null,            // Physical address
                    frequency: 0,         // NetworkUtils.frequencyFromChannel(Channel)
                    signal_level: 0,      // Signal, but is in percent not dBm
                    security: null        // Authentication
                };

                var connected = false;

                var ifaceExp = /Name                   : (.*)/;
                var ssidExp  = /SSID                   : (.*)/;
                var macExp   = /Physical address       : (.*)/;
                var freqExp  = /Channel                : (.*)/;
                var sigExp   = /Signal                 : (.*)/;
                var secExp   = /Authentication         : (.*)/;
                var stateExp = /State                  : (.*)/;
                // console.log(inputs);
                inputs.forEach(function (input) {
                    if (input != '' && input != '\n') {
                        var res;
                        if (res = input.match(ifaceExp)) {
                            connection.iface = res[1];
                        } else if (res = input.match(ssidExp)) {
                            connection.ssid = res[1];
                        } else if (res = input.match(macExp)) {
                            connection.mac = res[1];
                        } else if (res = input.match(freqExp)) {
                            connection.frequency = networkUtils.frequencyFromChannel(parseInt(res[1]));
                        } else if (res = input.match(secExp)) {
                            connection.security = res[1];
                        } else if (res = input.match(sigExp)) {
                            connection.signal_level = networkUtils.dBFromQuality(res[1]);
                        } else if (res = input.match(stateExp)) {
                            connected = res[1] === 'connected';
                        }
                    }
                });

                if (connected && connection.iface && (!config.iface || connection.iface === config.iface) && connection.ssid && connection.mac && connection.security) {
                    connections.push(connection);
                }
            }
        });
        return connections;
    }

    return function(callback) {

        var commandStr = "netsh wlan show interfaces" ;

    	exec(commandStr, env, function(err, stdout) {
            if (err) {
                callback && callback(err);
            } else {
                callback && callback(null, parseShowInterfaces(stdout));
            }
    	});
    }
}
