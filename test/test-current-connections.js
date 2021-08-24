require('dotenv').config();

const wifi = require('../src/index');

wifi.init({
  debug: true,
  iface: process.env.WIFI_IFACE
});

if (process.env.PROMISE == 'true') {
  console.log('with promise');
  wifi
    .getCurrentConnections()
    .then(currentConnections => {
      console.log(currentConnections);
    })
    .catch(e => {
      console.log(e);
    });
} else {
  console.log('with callback');
  wifi.getCurrentConnections((err, currentConnections) => {
    if (err) {
      console.log(err);
    } else {
      console.log(currentConnections);
    }
  });
}
