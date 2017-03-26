require('dotenv').config();

var wifi = require('../src/wifi');

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
