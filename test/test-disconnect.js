require('dotenv').config();

const wifi = require('../src/wifi');

wifi.init({
  debug: true,
  iface: process.env.WIFI_IFACE
});

wifi.disconnect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('disconnected');
  }
});
