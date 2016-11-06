var exec = require('child_process').exec;
var util = require('util');

function connectToWifi(config) {

    return function(ap, callback) {

	var new_env = util._extend(process.env, { LANG: "en"});

	var commandStr = "nmcli d wifi connect '" + ap.ssid + "'" + 
	    " password " + "'" + ap.password + "'" ;

	if (config.iface) {
	    commandStr = commandStr + " iface " + config.iface;
	}

	exec(commandStr, new_env, function(err, resp) {
	    
	    callback && callback(err);
	    
	});
    }
}

exports.connectToWifi = connectToWifi;
