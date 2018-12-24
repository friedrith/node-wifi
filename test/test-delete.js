require('dotenv').config();

var wifi = require('../src/wifi');

wifi.init({
    debug : true,
    iface : process.env.WIFI_IFACE
});

wifi.deleteConnection({ssid: process.env.WIFI_SSID}, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connection delete');
    }
});
