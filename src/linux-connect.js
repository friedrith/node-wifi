var exec = require('child_process').exec;

function connectToWifi(config) {

    return function(ap, callback) {


	var commandStr = "nmcli d wifi connect '" + ap.ssid + "'" + 
	    " password " + "'" + ap.password + "'" ;

	if (config.iface) {
	    commandStr = commandStr + " iface " + config.iface;
	}

	exec(commandStr, function(err, resp) {
	    
	    callback && callback(err);
	    
	});
    }
}

exports.connectToWifi = connectToWifi;
