var exec = require('child_process').exec;
var util = require('util');

module.exports = function (config) {

    return function(callback) {

    	var new_env = util._extend(process.env, { LANG: "en", LC_ALL: "en", LC_MESSAGES: "en"});

    	var commandStr = "nmcli dev disconnect" ;

    	if (config.iface) {
    	    commandStr += " iface " + config.iface;
    	}

    	exec(commandStr, new_env, function(err, resp) {
    	    callback && callback(err);
    	});
    }
}
