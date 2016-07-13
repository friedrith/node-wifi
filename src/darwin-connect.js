var exec = require('child_process').exec;

function connectToWifi(config) {

    return function(ap, callback) {
	
	if (config.iface) {
	    var commandStr = "networksetup -setairportnetwork " +
		config.iface.toString() + " " + ap.ssid + " " + ap.password;
	} else {
	    var commandStr = "networksetup -setairportnetwork en0 " +
		ap.ssid + " " + ap.password;
	}
	
	exec(commandStr, function(err, resp) {
	    
	    callback && callback(err);
	    
	});
    }
}

exports.connectToWifi = connectToWifi;
