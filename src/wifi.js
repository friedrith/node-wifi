var windowsConnect = require('./windows-connect.js').connectToWifi;
var windowsScan = require('./windows-scan.js').scanWifi;
var linuxConnect = require('./linux-connect');
var linuxDisconnect = require('./linux-disconnect');
var linuxScan = require('./linux-scan.js').scanWifi;
var macConnect = require('./mac-connect.js').connectToWifi;
var macScan = require('./mac-scan.js').scanWifi;

var config = {
    debug : false,
    iface : null
};

function init(options) {
    if (options && options.debug) {
        config.debug = options.debug;
    }

    if (options.iface) {
        config.iface = options.iface;
    }

    var scan = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var connect = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var disconnect = function () {
        throw new Error("ERROR : not available for this OS");
    };

    switch(process.platform) {
        case "linux":
            connect = linuxConnect(config);
            scan = linuxScan(config);
            disconnect = linuxDisconnect(config);
            break;
        case "darwin":
            connect = macConnect(config);
            scan = macScan(config);
            break;
        case "win32":
            connect = windowsConnect(config);
            scan = windowsScan(config);
            break;
        default:
            throw new Error("ERROR : UNRECOGNIZED OS");
    }
    exports.scan = scan;
    exports.connect = connect;
    exports.disconnect = disconnect;
}

exports.init = init;
exports.scan = function () {
    throw new Error("ERROR : use init before");
};

exports.connect = function () {
    throw new Error("ERROR : use init before");
};

exports.disconnect = function () {
    throw new Error("ERROR : use init before");
};
