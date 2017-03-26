var exec = require('child_process').exec;
var util = require('util');
var env = require('./env');

var escapeShell = function(cmd) {
    return '"'+cmd.replace(/(["\s'$`\\])/g,'\\$1')+'"';
};


module.exports = function (config) {

    return function(ap, callback) {


    	var commandStr = "nmcli dev wifi connect '" + ap.ssid + "'" +
    	    " password " + "'" + ap.password + "'" ;

    	if (config.iface) {
    	    commandStr = commandStr + " iface " + config.iface;
    	}

        // commandStr = escapeShell(commandStr);

    	exec(commandStr, env, function(err, resp) {
    	    callback && callback(err);
    	});
    }
}
