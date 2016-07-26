
node-wifi
===================


The node-wifi module allows mac, windows and linux users to interact with surrounding wifi networks through various methods.

These methods include scanning for wifi access points and connecting to these access points.

We wish to be clear in saying that this module is inspired from node-wifi-control but with some slight modifications to certain functions such as the various OS-specific parsers for terminal output as we noticed that these parsers did not work well on certain operating systems. 

----------

Install
-------------

    // Use as a module
    npm install node-wifi 

    // Use as a binary
    npm install node-wifi -g

----------

Getting started 
-------------


    var wifi = require('node-wifi');

    //Initialize wifi module
    wifi.init({
        debug : true,
        // the OS will find the right network interface if it is null  
        iface : null
    });

    //Scan networks
    wifi.scan(function(err, networks) {

        if (err) {
            console.log(err);
        } else {
            console.log(networks);
        }
    });

    //Connect to a network
    wifi.connect({ ssid : "ssid", password : "password"}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log('Connected');
    }); 


The module only manages :

* Connect for linux
* Scan for linux
* Connect for mac
* Scan for mac
* Connect for windows
* Scan for windows

Use as binary 
-------------

    wifi --scan 

    wifi --connect --ssid <ssid> --password <password> [--iface <wlan0>]
