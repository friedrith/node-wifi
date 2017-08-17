var exec = require('child_process').exec;
var env = require('./env');

module.exports = function(config) {

    return function(callback) {
        var cmd = "netsh wlan disconnect"

        if (config.iface) {
            cmd += ' interface="' + config.iface + '"'
        }

        exec(cmd, env, function(err, resp) {
            callback && callback(err);
        });
    }
}