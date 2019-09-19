var execFile = require('child_process').execFile;
var env = require('./env');
var os = require('os');

function connectToWifi(config, ap, callback) {
  var args = [];
  args.push('-w');
  args.push('10');
  args.push('device');
  args.push('wifi');
  args.push('connect');
  args.push(ap.ssid);
  args.push('password');
  args.push(ap.password);

  if (config.iface) {
    args.push('ifname');
    args.push(config.iface);
  }

  execFile('nmcli', args, { env: env }, function(err, resp) {
    // Errors from nmcli came from stdout, we test presence of 'Error: ' string
    if (resp.includes('Error: ')) {
      err = new Error(resp.replace('Error: ', ''));
    }

    // Get some iface information
    let iface;
    let conn;
    if(resp.includes('successfully activated')) {
      let regexp = /Device '(.*)' /;
      iface = resp.match(regexp)[1];
      conn = os.networkInterfaces()[iface];
    }

    // Create an object with info
    callback && callback(err, {
      iface: iface,
      mac: conn[0].mac,
    });
  });
}

module.exports = function(config) {
  return function(ap, callback) {
    if (callback) {
      connectToWifi(config, ap, callback);
    } else {
      return new Promise(function(resolve, reject) {
        connectToWifi(config, ap, function(err, conn) {
          if (err) {
            reject(err);
          } else {
            resolve(conn);
          }
        });
      });
    }
  };
};
