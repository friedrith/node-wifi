var wifi = require('../src/wifi');

wifi.init({
    debug : true
});

wifi.scan(function(err, resp) {
    
    if (err) {
	console.log(err);
    } else {
	console.log(resp);
    }
});