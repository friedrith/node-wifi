<div align="center">
<p>
<img src="https://raw.githubusercontent.com/friedrith/assets/master/node-wifi/logo.png" alt="node-wifi" />
<br>
<br>
<img src="https://github.com/friedrith/node-wifi/workflows/build/badge.svg" alt="travis" />
<a href="https://badge.fury.io/js/node-wifi"><img src="https://badge.fury.io/js/node-wifi.svg" alt="npm version" height="18"></a>
</p>
</div>

**I have great ambitions for this project and I am looking for maintainers who could help me to handle all improvements and
bug fixes about this project because the hardware/os dependencies make it quite
hard to test. You can contact me at [thibault.friedrich@gmail.com](mailto:thibault.friedrich@gmail.com).**

The node-wifi module allows macOS, windows and linux users to interact with surrounding wifi networks through various methods. These methods include scanning for wifi access points and connecting to these access points.

| Features                      | Linux | Mac | Windows |
| ----------------------------- | ----- | --- | ------- |
| Connect                       | ✓     | ✓   | ✓       |
| Scan                          | ✓     | ✓   | ✓       |
| List current wifi connections | ✓     | ✓   | ✓       |
| Disconnect                    | ✓     |     | ✓       |
| Delete connection information | ✓     | ✓   |         |

We wish to be clear in saying that this module is inspired from [node-wifi-control](https://github.com/msolters/wifi-control-node) but with some slight modifications to certain functions such as the various OS-specific parsers for terminal output as we noticed that these parsers did not work well on certain operating systems.

> As everything with hardware dependencies, weird behaviors may happen depending of your configuration. You should never hesitate to notify us about a specificity of your OS/Hardware/Wifi card/whatever.

---

## Install

```bash
# Use as a module
npm install node-wifi

# Use as a CLI
npm install node-wifi -g
```

## Getting started

```javascript
var wifi = require('node-wifi');

// Initialize wifi module
// Absolutely necessary even to set interface to null
wifi.init({
  iface: null // network interface, choose a random wifi interface if set to null
});

// Scan networks
wifi.scan((error, networks) => {
  if (error) {
    console.log(error);
  } else {
    console.log(networks);
    /*
        networks = [
            {
              ssid: '...',
              bssid: '...',
              mac: '...', // equals to bssid (for retrocompatibility)
              channel: <number>,
              frequency: <number>, // in MHz
              signal_level: <number>, // in dB
              quality: <number>, // same as signal level but in %
              security: 'WPA WPA2' // format depending on locale for open networks in Windows
              security_flags: '...' // encryption protocols (format currently depending of the OS)
              mode: '...' // network mode like Infra (format currently depending of the OS)
            },
            ...
        ];
        */
  }
});

// Connect to a network
wifi.connect({ ssid: 'ssid', password: 'password' }, error => {
  if (error) {
    console.log(error);
  }
  console.log('Connected');
});

// Disconnect from a network
// not available on all os for now
wifi.disconnect(error => {
  if (error) {
    console.log(error);
  } else {
    console.log('Disconnected');
  }
});

// Delete a saved network
// not available on all os for now
wifi.deleteConnection({ ssid: 'ssid' }, error => {
  if (error) {
    console.log(error);
  } else {
    console.log('Deleted');
  }
});

// List the current wifi connections
wifi.getCurrentConnections((error, currentConnections) => {
  if (error) {
    console.log(error);
  } else {
    console.log(currentConnections);
    /*
    // you may have several connections
    [
        {
            iface: '...', // network interface used for the connection, not available on macOS
            ssid: '...',
            bssid: '...',
            mac: '...', // equals to bssid (for retrocompatibility)
            channel: <number>,
            frequency: <number>, // in MHz
            signal_level: <number>, // in dB
            quality: <number>, // same as signal level but in %
            security: '...' //
            security_flags: '...' // encryption protocols (format currently depending of the OS)
            mode: '...' // network mode like Infra (format currently depending of the OS)
        }
    ]
    */
  }
});

// All functions also return promise if there is no callback given
wifi
  .scan()
  .then(networks => {
    // networks
  })
  .catch(error => {
    // error
  });
```

## Use as CLI

```javascript
wifi --scan

wifi --connect --ssid <ssid> --password <password> [--iface <wlan0>]

wifi --disconnect

wifi --current
```

## Platforms compatibility

This project is tested with operating systems:

- macOS Catalina 10.15.5
- linux Ubuntu 18.04.3 LTS

> Do not hesitate to create a pull request to add the OS you are using.

## Dependencies

Linux:

- network-manager (nmcli)

## Contribute

Please read [development guidelines](./CONTRIBUTING.md) before proposing a pull request.

## Roadmap

- [x] add conventional commits
- [x] plug to travis
- [x] add github templates
- [x] add eslint
- [x] add prettier
- [x] switch to MIT license
- [x] generate changelog and release note
- [x] stdout how to reproduce bug
- [x] use github actions
- [ ] add unit tests (in progress)
- [ ] rewrite the library using ES7 (in progress)
- [ ] harmonize security flags and modes
- [ ] install commitizen
- [ ] use xml to stabilize parsers
