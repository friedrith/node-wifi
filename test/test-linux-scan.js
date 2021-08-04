require('dotenv').config();

const scanWifi = require('../src/linux-scan');

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
