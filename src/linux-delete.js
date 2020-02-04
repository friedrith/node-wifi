var execFile = require('child_process').execFile;
var env = require('./env');

function deleteConnection(config, ap, callback) {
  var args = [];
  args.push('connection');
  args.push('delete');
  args.push('id');

  args.push(ap.ssid);

  execFile('nmcli', args, env, function(err) {
    callback && callback(err);
  });
}

module.exports = function(config) {
  return function(ap, callback) {
    if (callback) {
      deleteConnection(config, ap, callback);
    } else {
      return new Promise(function(resolve, reject) {
        deleteConnection(config, ap, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  };
};
