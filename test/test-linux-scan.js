require('dotenv').config();

var scanWifi = require('../src/linux-scan');

wifi.init({
    debug : true,
    iface : process.env.WIFI_IFACE
});

wifi.disconnect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('disconnected');
    }
});
