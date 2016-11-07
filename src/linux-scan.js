var exec = require('child_process').exec;
var networkUtils = require('./network-utils');
var util = require('util');


function scanWifi(config) {

    return function(callback) {

    	var networks = [];
    	var network = {};
    	var new_env = util._extend(process.env, { LANG: "en", LC_ALL: "en", LC_MESSAGES: "en"});

        var commandStr = "nmcli -f all -m multiline dev wifi list";

        if (config.iface) {
            commandStr += ' iface '+config.iface;
        }

    	exec(commandStr, new_env, function(err, scanResults) {

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
            // console.log(scanResults);

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
        		    network.frequency = parseInt(scanResults[i][1]);
        		    freq = true;
        		    break;
        		case 'SIGNAL':
        		    network.signal_level = networkUtils.dBFromQuality(
        			scanResults[i][1]);
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
}

exports.scanWifi = scanWifi;
