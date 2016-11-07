var exec = require('child_process').exec;
var env = require('./env');

function parseIwconfig (stdout) {
    var ifaces = stdout.split('\n\n');
    var connections = [];
    ifaces.forEach(function (iface) {
        var inputs = iface.split('  ');

        if (inputs.length > 0) {
            var connection = {
                iface: '',
                ssid: '',
                mac: '',
                frequency: 0,
                signal_level: 0
            };

            connection.iface = inputs.splice(0, 1)[0];
            // console.log(inputs);
            inputs.forEach(function (input) {
                if (input != '' && input != '\n') {
                    if (input.match(/ESSID:\"(.*)\"/)){
                        connection.ssid = input.match(/ESSID:\"(.*)\"/)[1];
                    } else if (input.match(/Frequency:(.*) GHz/)) {
                        connection.frequency = parseInt(parseFloat(input.match(/Frequency:(.*) GHz/)[1])*1000);
                    } else if (input.match(/Access Point: (.*)/)) {
                        connection.mac = input.match(/Access Point: (.*)/)[1];
                    } else if (input.match(/Signal level=(.*) dBm/)) {
                        connection.signal_level = input.match(/Signal level=(.*) dBm/)[1];
                    }
                }
            });

            if (connection.iface && connection.ssid && connection.frequency && connection.mac && connection.signal_level) {
                connections.push(connection);
            }
        }
    });
    return connections;
}

module.exports = function (config) {

    return function(callback) {

    	var commandStr = "iwconfig" ;

    	if (config.iface) {
    	       commandStr += " " + config.iface;
    	}

    	exec(commandStr, env, function(err, stdout) {
            if (err) {
                callback && callback(err);
            } else {
                callback && callback(null, parseIwconfig(stdout));
            }
    	});
    }
}
