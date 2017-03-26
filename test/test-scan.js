require('dotenv').config();

var wifi = require('../src/wifi');

wifi.init({
    debug : true,
    iface: process.env.WIFI_IFACE
});



wifi.scan(function(err, networks) {
    if (err) {
        console.log(err);
    } else {
        console.log(networks);
    }
});
