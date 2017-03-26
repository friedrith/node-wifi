var exec = require('child_process').exec;
var env = require('./env');

function connectToWifi(config) {

    return function(ap, callback) {

    	var iface = 'en0';
    	var commandStr = "networksetup -setairportnetwork ";

    	if (config.iface) {
    	    iface = config.iface.toString();
    	}
    	commandStr = commandStr + "'" + iface + "'" + " " + "'" + ap.ssid + "'" + " " + "'" + ap.password + "'";
    	//console.log(commandStr);

    	exec(commandStr, env, function(err, resp) {
    	    callback && callback(err);
    	});
    }
}

exports.connectToWifi = connectToWifi;
