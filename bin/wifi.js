#!/usr/bin/env node

'use strict';

var wifi = require('../src/wifi');
var nconf = require('nconf');

var conf = nconf.argv({
    "scan": {
	describe : "scan for wifi networks",
	demand : true,
	default : false
    },
    "connect": {
	describe : "connect to a wifi network",
	demand : true,
	default : false
    },
    "ssid": {
	describe : "network ssisd you want to connect to",
	default : ""
    },
    "password": {
	describe : "network password you want to connect to",
	default : ""
    },
    "iface": {
	describe : "network interface you want to use",
	default : 'en0'
    }
}).env();


var scan = nconf.get('scan');
var connect = nconf.get('connect');
var ssid = nconf.get('ssid');
var password = nconf.get('password');
var iface = nconf.get('iface');


wifi.init({
    iface : iface
});

if (scan && connect) {

    throw new Error('You cannot scan and connect at the same time');

}

if (scan) {

    wifi.scan(function(err, resp) {

	if (err) {
	    console.log(err);
	} else {
	    console.log(resp);
	}
    });
}

if (connect) {

    var ap = {
	ssid : ssid,
	password : password
    }

    wifi.connect(ap, function(err) {

	if (err) {

	    console.log(err);

	}
    });
};
