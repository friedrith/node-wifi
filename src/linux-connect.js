var exec = require('child_process').exec;

function connectToWifi(config) {

    return function(ap, callback) {

	if (config.iface) {
	    var commandStr = "nmcli d wifi connect '" + ap.ssid + "'" + 
		" password " + "'" + ap.password + "'" + " iface " + 
		config.iface;
	} else {
	    var commandStr = "nmcli d wifi connect '" + ap.ssid + "'" + 
		" password " + "'" + ap.password + "'";
	}

	exec(commandStr, function(err, resp) {
	    
	    callback && callback(err);
	    
	});
    }
}

exports.connectToWifi = connectToWifi;
