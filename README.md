
node-wifi
===================


The node-wifi module allows mac, windows and linux users to interact with surrounding wifi networks through various methods.

These methods include scanning for wifi access points and connecting to these access points.

We wish to be clear in saying that this module is inspired from node-wifi-control but with some slight modifications to certain functions such as the various OS-specific parsers for terminal output as we noticed that these parsers did not work well on certain operating systems. 


----------

Getting started 
-------------

```
var wifi = require('node-wifi');

//Initialize wifi module
wifi.init({
debug : true,  //verbose output
connectionDelay : 0  //adds a delay to callback in connect
})

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
```

The module only manages :

* Connect for linux
* Scan for linux
* Connect for darwin
* Scan for darwin

Executing bin scripts 
-------------

```
//executing scan function

./scan --otpions
```
####options####

- debug

```
//executing connect function 

./connect --options
```
####Options####

- ssid
- password
- iface 
- debug

#####Example####

```
//executing scan function
./scan --ssid yourSSID --password yourPassword
```

```
//executing connect function

./connect --debug
```