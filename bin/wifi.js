#!/usr/bin/env node
/* eslint-disable no-process-exit */

'use strict';

const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');

const packageJson = require('../package.json');

const wifi = require('../src/wifi');
const { sections, optionDefinitions } = require('./help');

const usage = getUsage(sections);

var options = null;

try {
  options = commandLineArgs(optionDefinitions);
} catch (e) {
  console.error('Bad options, please see the help with option -h', e);
  process.exit(2);
}

if (options.version) {
  console.log('Version ' + packageJson.version);
  process.exit(0);
}

if (options.help) {
  console.log(usage);
  process.exit(0);
}

var cmds = 0;

if (options.connect) cmds++;
if (options.disconnect) cmds++;
if (options.scan) cmds++;
if (options.current) cmds++;
if (options.delete) cmds++;

if (cmds > 1) {
  console.error('You cannot do several operations at the same time');
  process.exit(2);
}

if (
  !options.connect &&
  !options.scan &&
  !options.disconnect &&
  !options.current &&
  !options.delete
) {
  console.log(usage);
  process.exit(2);
}

wifi.init({
  iface: options.iface
});

if (options.scan) {
  wifi.scan((error, resp) => {
    if (error) {
      console.error(error);
      process.exit(2);
    } else {
      console.log(resp);
    }
  });
} else if (options.connect) {
  if (!options.ssid || !options.password) {
    console.error(usage);
    process.exit(2);
  }

  const accessPoint = {
    ssid: options.ssid,
    password: options.password
  };

  wifi.connect(accessPoint, error => {
    if (error) {
      console.error(error);
      process.exit(2);
    }
  });
} else if (options.disconnect) {
  wifi.disconnect(error => {
    if (error) {
      console.error(error);
      process.exit(2);
    }
  });
} else if (options.current) {
  wifi.getCurrentConnections((error, currentConnections) => {
    if (error) {
      console.log(error);
      process.exit(2);
    } else {
      console.log(currentConnections);
    }
  });
} else if (options.delete) {
  console.log('ok');
  if (!options.ssid) {
    console.error(usage);
    process.exit(2);
  }

  const accessPoint = {
    ssid: options.ssid
  };

  wifi.deleteConnection(accessPoint, error => {
    if (error) {
      console.error(error);
      process.exit(2);
    }
  });
}
