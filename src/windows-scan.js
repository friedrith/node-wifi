var exec = require('child_process').exec;
var networkUtils = require('./network-utils');
var util = require('util');

function scanWifi(config) {


	return function(callback) {

		var networks = [];
		var network = {};
		var new_env = util._extend(process.env, { LANG: "en", LC_ALL: "en", LC_MESSAGES: "en"});

		exec("chcp 65001 && netsh wlan show networks mode=Bssid", new_env, function(err, scanResults) {

			if (err) {

				callback && callback(err);
				return;

			}

			scanResults = scanResults.toString('utf8').split(' ').join('').split('\r').join('').split('\n').slice(5, scanResults.length);

			var numNetworks = -1;
			var currentLine = 0;
			var networkTmp;
			var networksTmp = [];
			var network;
			var networks = [];

			for (var i = 0; i < scanResults.length; i++) {
				if (scanResults[i] == '') {
					numNetworks++;
					networkTmp = scanResults.slice(currentLine, i);
					networksTmp.push(networkTmp);
					currentLine = i+1;
				}
			}

			for (var i = 0; i < numNetworks; i++) {
				network = parse(networksTmp[i]);
				networks.push(network);
			}
			var resp = networks;
			callback && callback(null, resp);
		});
	}
}

function parse(networkTmp) {

	var network = {
		mac : null,
		ssid : null,
		channel : null,
		signal_level : null,
		security : null,
	};

	var macLine = networkTmp[4].split(' ').join('').split(':');
	var ssidLine = networkTmp[0].split(' ').join('').split(':');
	var channelLine = networkTmp[7].split(' ').join('').split(':');
	var signalLine = networkTmp[5].split(' ').join('').split(':');
	var securityLine = networkTmp[2].split(' ').join('').split(':');

	network.mac = macLine[1]+':'+macLine[2]+':'+macLine[3]+':'+macLine[4]+
			':'+macLine[5]+':'+macLine[6];
	network.ssid = ssidLine[1];
	network.channel = networkUtils.frequencyFromChannel(channelLine[1]);
	network.signal_level = networkUtils.dBFromQuality(signalLine[1]);
	network.security = securityLine[1];

	return network;

}

exports.scanWifi = scanWifi;
