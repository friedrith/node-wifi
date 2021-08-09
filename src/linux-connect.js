const execFile = require('child_process').execFile;
const env = require('./env');

function connectToWifi(config, ap, callback) {
  const args = [];
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

  execFile('nmcli', args, { env }, (err, resp) => {
    // Errors from nmcli came from stdout, we test presence of 'Error: ' string
    if (resp.includes('Error: ')) {
      err = new Error(resp.replace('Error: ', ''));
    }
    callback && callback(err);
  });
}

module.exports = config => {
  return (ap, callback) => {
    if (callback) {
      connectToWifi(config, ap, callback);
    } else {
      return new Promise((resolve, reject) => {
        connectToWifi(config, ap, err => {
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
