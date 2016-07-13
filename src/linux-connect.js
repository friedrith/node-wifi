var exec = require('child_process').exec;

function connectToWifi(ap, callback) {

    var commandStr = "nmcli d wifi connect '" + ap.ssid + "'" + 
	" password " + "'" + ap.password + "'";

    exec(commandStr, function(err, resp) {

	callback && callback(err);

    });
}

exports.connectToWifi = connectToWifi;
