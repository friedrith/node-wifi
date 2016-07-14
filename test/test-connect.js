var wifi = require('../src/wifi');

wifi.init({
    debug : true,
    iface : 'wlan0'
});

var ap = {   
    ssid : "Elqui_Guests",
    password : ""
}

wifi.connect(ap, function(err) {

    if (err) {

	console.log(err);

    }
});
