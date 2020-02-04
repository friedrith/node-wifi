var execFile = require('child_process').execFile;
var env = require('./env');

function deleteConnection(config, ap, callback) {
  var iface = 'en0';
  var args = ['-removepreferredwirelessnetwork'];

  if (config.iface) {
    iface = config.iface.toString();
  }

  args.push(iface);
  args.push(ap.ssid);

  execFile('networksetup', args, env, function(err, resp) {
    if (
      resp &&
      resp.indexOf('was not found in the preferred networks list') >= 0
    ) {
      callback && callback(resp);
    } else {
      callback && callback(err);
    }
  });
}

module.exports = function(config) {
  return function(ap, callback) {
    if (callback) {
      deleteConnection(config, ap, callback);
    } else {
      return new Promise(function(resolve, reject) {
        deleteConnection(config, ap, function(err, networks) {
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
