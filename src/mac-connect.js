var exec = require('child_process').exec;

function connectToWifi(config) {

    return function(ap, callback) {

	var commandStr = "networksetup -setairportnetwork ";
	
	if (config.iface) {
	    commandStr += config.iface.toString() + " " +
		ap.ssid + " " + ap.password;
	} else {
	    commandStr += "en0 " + ap.ssid + " " + ap.password;
	}
	
	exec(commandStr, function(err, resp) {
	    
	    callback && callback(err);
	    
	});
    }
}

exports.connectToWifi = connectToWifi;
