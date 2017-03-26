require('dotenv').config();

var wifi = require('../src/wifi');

wifi.init({
    iface : process.env.WIFI_IFACE
});

wifi.getCurrentConnections(function(err, currentConnections) {
    if (err) {
        console.log(err);
    } else {
        console.log(currentConnections);
    }
});
