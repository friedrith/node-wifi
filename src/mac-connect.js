var execFile = require('child_process').execFile;
var env = require('./env');

function connectToWifi(config, ap, callback) {
  var iface = 'en0';
  var args = ['-setairportnetwork'];

  if (config.iface) {
    iface = config.iface.toString();
  }
  args.push(iface);
  args.push(ap.ssid);
  args.push(ap.password);

  execFile('/usr/sbin/networksetup', args, { env }, function(err, resp) {
    if (resp && resp.indexOf('Failed to join network') >= 0) {
      callback && callback(resp);
    } else if (resp && resp.indexOf('Could not find network') >= 0) {
      callback && callback(resp);
    } else {
      callback && callback(err);
    }
  });
}

module.exports = function(config) {
  return function(ap, callback) {
    if (callback) {
      connectToWifi(config, ap, callback);
    } else {
      return new Promise(function(resolve, reject) {
        connectToWifi(config, ap, function(err, networks) {
          if (err) {
            reject(err);
          } else {
            resolve(networks);
          }
        });
      });
    }
  };
};
