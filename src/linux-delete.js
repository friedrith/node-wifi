const execFile = require('child_process').execFile;
const env = require('./env');

function deleteConnection(config, ap, callback) {
  const args = [];
  args.push('connection');
  args.push('delete');
  args.push('id');

  args.push(ap.ssid);

  execFile('nmcli', args, env, err => {
    callback && callback(err);
  });
}

module.exports = config => {
  return (ap, callback) => {
    if (callback) {
      deleteConnection(config, ap, callback);
    } else {
      return new Promise((resolve, reject) => {
        deleteConnection(config, ap, err => {
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
