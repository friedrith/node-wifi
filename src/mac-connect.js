var exec = require('child_process').exec;
var util = require('util');

function connectToWifi(config) {

    return function(ap, callback) {

	var new_env = util._extend(process.env, { LANG: "en"});
	var commandStr = "networksetup -setairportnetwork ";
	
	if (config.iface) {
	    commandStr += config.iface.toString() + " " +
		ap.ssid + " " + ap.password;
	} else {
	    commandStr += "en0 " + ap.ssid + " " + ap.password;
	}
	
	exec(commandStr, new_env, function(err, resp) {
	    
	    callback && callback(err);
	    
	});
    }
}

exports.connectToWifi = connectToWifi;
