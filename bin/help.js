const optionDefinitions = [
  {
    name: 'scan',
    type: Boolean,
    description:
      'Scan for wifi networks. It returns a JSON formatted response with ssid, bssid, frequency, signal level and security for every network detected.'
  },
  {
    name: 'connect',
    type: Boolean,
    description:
      'Connect to a wifi network. It needs options {bold --ssid} and {bold --password}. A specific interface may be selected by adding option {bold --iface}'
  },
  {
    name: 'disconnect',
    type: Boolean,
    description:
      'Disconnect from a wifi network. A specific interface may be selected by adding option {bold --iface}'
  },
  {
    name: 'current',
    type: Boolean,
    description:
      'List the current wifi connections. A specific interface may be selected by adding option {bold --iface}'
  },
  {
    name: 'delete',
    type: Boolean,
    description:
      'Delete the wifi config related to a specific network identified by a ssid. It needs options {bold --ssid}. A specific interface may be selected by adding option {bold --iface}'
  },
  {
    name: 'ssid',
    type: String,
    typeLabel: '{underline ssid}',
    description: 'Ssid to connect to the wifi.'
  },
  {
    name: 'password',
    type: String,
    typeLabel: '{underline password}',
    description: 'Password to connect to the wifi.'
  },
  {
    name: 'iface',
    type: String,
    typeLabel: '{underline interface}',
    description: 'Network interface to connect to the wifi.'
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Show the help.'
  },
  {
    name: 'version',
    alias: 'v',
    type: Boolean,
    description: 'Display the current version of node-wifi.'
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

module.exports = {
  sections,
  optionDefinitions
};
