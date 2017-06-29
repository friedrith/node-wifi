var exec = require('child_process').exec;
var networkUtils = require('./network-utils');
var env = require('./env');

function scanWifi(config) {


	return function(callback) {

		var networks = [];
		var network = {};

		exec("chcp 65001 && netsh wlan show networks mode=Bssid", env, function(err, scanResults) {

			if (err) {

				callback && callback(err);
				return;

			}

			scanResults = scanResults.toString('utf8')/*.split(' ').join('')*/.split('\r').join('').split('\n').slice(5, scanResults.length);

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

	// console.log(networkTmp)

	var network = {
		mac : null,
		ssid : null,
		frequency : null,
		signal_level : null,
		security : null,
	};

	// console.log(networkTmp[4].match(/.*?:\s(.*)/))

	// var macLine = networkTmp[4].match(/.*?:\s(.*)/)[1];//.split(' ').join('').split(':');
	var ssidLine = networkTmp[0].split(' ').join('').split(':');
	var channelLine = networkTmp[7].split(' ').join('').split(':');
	var signalLine = networkTmp[5].split(' ').join('').split(':');
	var securityLine = networkTmp[2].split(' ').join('').split(':');

	/*
	var macLine = networkTmp[4].split(' ').join('').split(':');
	var ssidLine = networkTmp[0].split(' ').join('').split(':');
	var channelLine = networkTmp[7].split(' ').join('').split(':');
	var signalLine = networkTmp[5].split(' ').join('').split(':');
	var securityLine = networkTmp[2].split(' ').join('').split(':');*/

	network.mac = networkTmp[4].match(/.*?:\s(.*)/)[1];
	network.ssid = networkTmp[0].match(/.*?:\s(.*)/)[1];
	network.frequency = networkUtils.frequencyFromChannel(networkTmp[7].match(/.*?:\s(.*)/)[1]);
	network.signal_level = networkUtils.dBFromQuality(networkTmp[5].match(/.*?:\s(.*)/)[1]);
	network.security = networkTmp[2].match(/.*?:\s(.*)/)[1];

	return network;

}

exports.scanWifi = scanWifi;
