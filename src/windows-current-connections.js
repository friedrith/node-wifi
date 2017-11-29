var exec = require('child_process').exec;
var env = require('./env');
var networkUtils = require('./network-utils.js');

function parseShowInterfaces (stdout, config) {
    var lines = stdout.split('\r\n');
    var connections = [];
    var i = 3;
    while (lines.length > i + 18) {
        var connection = {
            iface: null,          // Name
            ssid: null,           // SSID
            bssid: null,
            mode: '',
            mac: null,            // Physical address
            frequency: 0,         // NetworkUtils.frequencyFromChannel(Channel)
            signal_level: 0,      // Signal, but is in percent not dBm
            security: null,        // Authentication
            security_flags: null,
        };

        var tmpConnection = {};
        var fields = [
            'name',
            'description',
            'guid',
            'mac',
            'state',
            'ssid',
            'bssid',
            'mode',
            'radio',
            'authentication',
            'encryption',
            'connection',
            'channel',
            'reception',
            'transmission',
            'signal',
            'profil'
        ];
        for (var j = 0 ; j < fields.length ; j++) {
            var line = lines[i + j];
            tmpConnection[fields[j]] = line.match(/.*\: (.*)/)[1];
        }

        connections.push({
            iface: tmpConnection['name'],
            ssid: tmpConnection['ssid'],
            bssid: tmpConnection['bssid'],
            mac: tmpConnection['bssid'],
            mode: tmpConnection['mode'],
            channel: parseInt(tmpConnection['channel']),
            frequency:  parseInt(networkUtils.frequencyFromChannel(parseInt(tmpConnection['channel']))),
            signal_level: networkUtils.dBFromQuality(tmpConnection['signal']),
            security: tmpConnection['authentication'],
            security_flags: tmpConnection['encryption'],
        })

        i = i + 18;
    }

    return connections;
}

function getCurrentConnection(config, callback) {
    var commandStr = "netsh wlan show interfaces" ;
    exec(commandStr, env, function(err, stdout) {
        if (err) {
            callback && callback(err);
        } else {
            try {
                 var connections = parseShowInterfaces(stdout, config)
                 callback && callback(null, connections);
            } catch (e) {
                callback && callback(e);
            }
        }
    });
}

module.exports = function (config) {
    return function(callback) {
        if (callback) {
            getCurrentConnection(config, callback);
        } else {
            return new Promise(function (resolve, reject) {
                getCurrentConnection(config, function (err, connections) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(connections);
                    }
                })
            });
        }
    }
}
