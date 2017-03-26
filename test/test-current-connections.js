var wifi = require('../src/wifi');

wifi.init({
    iface : null
});

wifi.getCurrentConnections(function(err, currentConnections) {
    if (err) {
        console.log(err);
    } else {
        console.log(currentConnections);
    }
});
