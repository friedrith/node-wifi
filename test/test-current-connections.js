require('dotenv').config();

var wifi = require('../src/wifi');

wifi.init({
    iface : process.env.WIFI_IFACE
});

if (process.env.PROMISE == "true") {
  console.log('with promise');
  wifi.getCurrentConnections().then(function (currentConnections) {
    console.log(currentConnections)
  }).catch(function (e) {
    console.log(e);
  })
} else {
  console.log('with callback');
  wifi.getCurrentConnections(function(err, currentConnections) {
      if (err) {
          console.log(err);
      } else {
          console.log(currentConnections);
      }
  });
}
