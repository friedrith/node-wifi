var windowsConnect = require('./windows-connect.js').connectToWifi;
var windowsScan = require('./windows-scan.js').scanWifi;
var linuxConnect = require('./linux-connect.js').connectToWifi;
var linuxScan = require('./linux-scan.js').scanWifi;
var darwinConnect = require('./darwin-connect.js').connectToWifi;
var darwinScan = require('./darwin-scan.js').scanWifi;

var scan;
var connect;

var config = {
    debug : false,
    callbackDelay : 0,
    iface : null
}


function init(options) {

    if (options.debug == true) {
	config.debug = true;
    } else {
	config.debug = false;
    }
    config.callbackDelay = options.callbackDelay;
    config.iface = options.iface;

    switch(process.platform) {

    case "linux":
	connect = linuxConnect;
	scan = linuxScan;
	if (config.iface == null) {
	    config.iface = 'wlan0';
	}
	break;
    case "darwin":
	connect = darwinConnect;
	scan = darwinScan;
	if (config.iface == null) {
	    config.iface = en0;
	}
	break;
    case "win32":
	connect = windowsConnect;
	scan = windowsScan;
	break;
    default:
	console.log("ERROR : UNRECOGNIZED OS");
	process.exit();
    }
    exports.scan = scan;
    exports.connect = connect;
    exports.config = config;
}

exports.init = init;
