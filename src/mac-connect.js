var exec = require('child_process').exec;
var util = require('util');

function connectToWifi(config) {

    return function(ap, callback) {

    	var new_env = util._extend(process.env, { LANG: "en", LC_ALL: "en", LC_MESSAGES: "en"});
    	var iface = 'en0';
    	var commandStr = "networksetup -setairportnetwork ";

    	if (config.iface) {
    	    iface = config.iface.toString();
    	}
    	commandStr = commandStr + "'" + iface + "'" + " " + "'" + ap.ssid + "'" + " " + "'" + ap.password + "'";
    	//console.log(commandStr);

    	exec(commandStr, new_env, function(err, resp) {
    	    callback && callback(err);
    	});
    }
}

exports.connectToWifi = connectToWifi;
