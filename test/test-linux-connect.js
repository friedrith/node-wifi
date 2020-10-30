require('dotenv').config();

const config = {
  debug : true,
  iface : process.env.WIFI_IFACE
};

const connect = require('../src/linux-connect')(config);

var ap = {
  ssid : process.env.WIFI_SSID,
  password : process.env.WIFI_PASSWORD,
  sudo : process.env.SUDO,
  timeout : process.env.TIMEOUT,
}

if (process.env.PROMISE == "true") {
  console.log('with promise');
  connect(ap).then(function () {
    console.log('connected');
  }).catch(function (e) {
    console.log(e);
  })
} else {
  console.log('with callback');
  connect(ap, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('connected');
    }
  });
}

