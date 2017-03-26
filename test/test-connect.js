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

wifi.connect(ap, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected');
    }
});
