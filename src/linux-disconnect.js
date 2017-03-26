var exec = require('child_process').exec;
var env = require('./env');

module.exports = function (config) {

    return function(callback) {

    	var commandStr = "nmcli dev disconnect" ;

    	if (config.iface) {
    	    commandStr += " " + config.iface;
    	}

    	exec(commandStr, env, function(err, resp) {
    	    callback && callback(err);
    	});
    }
}
