var wifi = require('../src/wifi');

wifi.init({
    debug : true,
    iface : 'wlp1s0'
});

wifi.disconnect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('disconnected');
    }
});
