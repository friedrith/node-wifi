var exec = require('child_process').exec;
var networkUtils = require('./network-utils');
var env = require('./env');

function scanWifi(config, callback) {
	var networks = [];
	var network = {};
	try {
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
	} catch (e) {
		callback && callback(e);
	}

}

function parse(networkTmp) {
	var network = {
		mac : null,
		ssid : null,
		frequency : null,
		signal_level : null,
		security : null,
	};
	network.mac = networkTmp[4].match(/.*?:\s(.*)/)[1];
	network.bssid = network.mac;
	network.ssid = networkTmp[0].match(/.*?:\s(.*)/)[1];
	network.channel = parseInt(networkTmp[7].match(/.*?:\s(.*)/)[1]);
	network.frequency = parseInt(networkUtils.frequencyFromChannel(network.channel));
	network.signal_level = networkUtils.dBFromQuality(networkTmp[5].match(/.*?:\s(.*)/)[1]);
	network.security = networkTmp[2].match(/.*?:\s(.*)/)[1];
	network.security_flags = networkTmp[3].match(/.*?:\s(.*)/)[1];
	network.mode = 'Unknown';

	return network;

}

module.exports = function (config) {
  return function (callback) {
    if (callback) {
      scanWifi(config, callback);
    } else {
      return new Promise(function (resolve, reject) {
        scanWifi(config, function (err, networks) {
          if (err) {
            reject(err);
          } else {
            resolve(networks);
          }
        });
      });
    }
  }
};
