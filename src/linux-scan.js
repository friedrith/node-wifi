var exec = require('child_process').exec;

function scanWifi(callback) {

    var networks = [];
    var network = {};

    exec("nmcli -m multiline dev wifi list", function(err, scanResults) { 	

	if (err) {

	    callback && callback(err);
	    return;

	}

	var ssid = false;
	var freq = false;
	var signal = false;
	var sec = false;
	var mac = false;

	scanResults = scanResults.toString('utf8').split(' ').join('').split('\n');	
	
	for (var i = 0; i < scanResults.length; i++) {

	    scanResults[i] = scanResults[i].split(":");
	    if (scanResults[i].length == 2) {
		scanResults[i][1] = scanResults[i][1].split("'").join("");
	    }
	    switch(scanResults[i][0]) {
	    case 'SSID':
		network.ssid = scanResults[i][1];
		ssid = true;
		break;
	    case 'FREQ':
		network.channel = parseInt(scanResults[i][1]);
		freq = true;
		break;
	    case 'SIGNAL':
		network.signal_level = dBFromQuality(scanResults[i][1]);
	    signal = true;
	    break;
	    case 'SECURITY':
		network.security = scanResults[i][1];
		sec = true;
		break;
	    case 'BSSID':
		var macAdress = '';
		for (var j = 1; j < 6; j++) {
		    macAdress = macAdress + scanResults[i][j] + ':';
		}
		macAdress = macAdress + scanResults[i][6];
		network.mac = macAdress;
		mac = true;
		break;
	    default:
		break;
	    }
	    if ((ssid) && (freq) && (signal) && (sec) && (mac)) {
		networks.push(network);
		network = {};
		ssid = false;
		freq = false;
		signal = false;
		sec = false;
		mac = false;
	    }
	}
	var resp = networks;
	callback && callback(null, resp);
    });
}	       
		       
function dBFromQuality(quality) {
    return (parseFloat(quality)/2-100);
}

exports.scanWifi = scanWifi;