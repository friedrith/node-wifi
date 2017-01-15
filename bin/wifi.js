#!/usr/bin/env node

'use strict';

const commandLineArgs = require('command-line-args')
const getUsage = require('command-line-usage')

var wifi = require('../src/wifi');

const optionDefinitions = [
  {
      name: 'scan',
      type: Boolean,
      description: 'Scan for wifi networks. It returns a JSON formatted response with ssid, bssid, frequency, signal level and security for every network detected.'
  },
  {
      name: 'connect',
      type: Boolean,
      description: 'Connect to a wifi network. It needs options [bold]{--ssid} and [bold]{--password}. A specific interface may be selected by addind option [bold]{--iface}'
  },
  {
      name: 'disconnect',
      type: Boolean,
      description: 'Disconnect from a wifi network. A specific interface may be selected by addind option [bold]{--iface}'
  },
  {
      name: 'ssid',
      type: String,
      typeLabel: '[underline]{ssid}',
      description: 'Ssid to connect to the wifi.'
  },
  {
      name: 'password',
      type: String,
      typeLabel: '[underline]{password}',
      description: 'Password to connect to the wifi.'
  },
  {
      name: 'iface',
      type: String,
      typeLabel: '[underline]{interface}',
      description: 'Network interface to connect to the wifi.'
  },
  {
      name: 'help',
      alias: 'h',
      type: Boolean,
      description: "Show the help."
  }
];

const sections = [
  {
    header: 'Wifi',
    content: 'Multi-OS tool to manage wifi.'
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  }
];

const usage = getUsage(sections)

var options = null;

try {
    options = commandLineArgs(optionDefinitions)
} catch (e) {
    console.log('Bad options, please see the help with option -h');
    process.exit(2);
}

if (options.help) {
    console.log(usage);
    process.exit(0);
}

var cmds = 0;

if (options.connect) cmds++;
if (options.disconnect) cmds++;
if (options.scan) cmds++;

if (cmds > 1) {
    console.log('You cannot connect, disconnect and scan at the same time');
    process.exit(2);
    // throw new Error();
}

if (!options.connect && !options.scan && !options.disconnect) {
    console.log(usage);
    process.exit(2);
}

wifi.init({
    iface : options.iface
});

if (options.scan) {

    wifi.scan(function(err, resp) {
    	if (err) {
    	    console.log(err);
            process.exit(2);
    	} else {
    	    console.log(resp);
    	}
    });
}

if (options.connect) {

    var ap = {
    	ssid : options.ssid,
    	password : options.password
    }

    wifi.connect(ap, function(err) {
    	if (err) {
    	    console.log(err);
            process.exit(2);
    	}
    });
};

if (options.connect) {

    var ap = {
    	ssid : options.ssid,
    	password : options.password
    }

    wifi.connect(ap, function(err) {
    	if (err) {
    	    console.log(err);
            process.exit(2);
    	}
    });
};
