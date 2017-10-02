require('dotenv').config();

var wifi = require('../src/wifi');

wifi.init({
    debug : true,
    iface : process.env.WIFI_IFACE
});

var ap = {
    ssid : process.env.WIFI_SSID,
    password : process.env.WIFI_PASSWORD
}

if (process.env.PROMISE == "true") {
  console.log('with promise');
  wifi.connect(ap, function(err) {
      if (err) {
          console.log(err);
      } else {
          console.log('connected');
      }
  });
} else {
  console.log('with callback');
  wifi.connect(ap).then(function () {
    console.log('connected');
  }).catch(function (e) {
    console.log(e);
  })
}
