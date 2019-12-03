var execFile = require('child_process').execFile;
var env = require('./env');

// sleep function is required to delay the two commands without breaking into a promise (like with setTimeout)
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

async function disconnect(config, callback) {
  var iface = 'en0';
  var delay = 0;
  var option = '-setairportpower';

  if (config.iface) {
    iface = config.iface.toString();
  }
  if (config.delay) {
    delay = parseInt(config.delay);
  }

  let commands = [
    [option, iface, 'off'],
    [option, iface, 'on']
  ];
  
  try {
     await execFile('networksetup', commands[0], { env });
  } catch(err) {
     callback && callback(err);
  }
  
  if (delay!==0)
    await sleep(delay*1000);
  
  execFile('networksetup', commands[1], { env }, function(err) {
     callback && callback(err);
  });	              
}

module.exports = function(config) {
  return function(callback) {
    if (callback) {
      disconnect(config, callback);
    } else {
      return new Promise(function(resolve, reject) {
        disconnect(config, function(err) {
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
