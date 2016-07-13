var windowsConnect = require('./windows-connect.js').connectToWifi;
var windowsScan = require('./windows-scan.js').scanWifi;
var linuxConnect = require('./linux-connect.js').connectToWifi;
var linuxScan = require('./linux-scan.js').scanWifi;
var darwinConnect = require('./darwin-connect.js').connectToWifi;
var darwinScan = require('./darwin-scan.js').scanWifi;

var scan;
var connect;
var debug;
var callbackDelay;

function init(options) {

    if (options.debug == true) {
	debug = true;
    } else {
	debug = false;
    }

    if (options.callbackDelay) {
	callbackDelay = options.callbackDelay;
    }


    switch(process.platform) {

    case "linux":
	connect = linuxConnect;
	scan = linuxScan;
	break;
    case "darwin":
	connect = darwinConnect;
	scan = darwinScan;
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
}

exports.init = init;
