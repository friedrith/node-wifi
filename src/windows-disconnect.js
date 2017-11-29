var exec = require('child_process').exec;
var env = require('./env');

function disconnect (config, callback) {
    var cmd = "netsh wlan disconnect"
    if (config.iface) {
        cmd += ' interface="' + config.iface + '"'
    }
    exec(cmd, env, function(err, resp) {
        callback && callback(err);
    });
}

module.exports = function (config) {
    return function(callback) {
        if (callback) {
            disconnect(config, callback);
        } else {
            return new Promise(function (resolve, reject) {
                disconnect(config, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                })
            })
        }
    }
}
