var wifi = require('../src/wifi');

wifi.init({
    debug : true,
    iface: 'wlan0'
});

wifi.scan(function(err, networks) {
    if (err) {
        console.log(err);
    } else {
        console.log(networks);
    }
});
