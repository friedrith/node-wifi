var fs = require('fs');
var exec = require('child_process').exec;

function connectToWifi(config) {

 	return function(ap, callback) {

      		var COMMANDS, com, connectToAPChain, i, j, l, len, ref, ssid, xmlContent;
      		ssid = {
        	plaintext: ap.ssid,
        	hex: ""
      		};
      		for (i = j = 0, ref = ssid.plaintext.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        	ssid.hex += ssid.plaintext.charCodeAt(i).toString(16);
      		}
      		xmlContent = null;
      		if (ap.password.length) {
        	xmlContent = win32WirelessProfileBuilder(ssid, "wpa2", ap.password);
      		} else {
        	xmlContent = win32WirelessProfileBuilder(ssid);
      		}
      		fs.writeFileSync(ap.ssid + ".xml", xmlContent);
      		COMMANDS = {
      		loadProfile: "netsh " + "wlan" + " add profile filename=\"" + ap.ssid + ".xml\"",
      		connect: "netsh " + "wlan" + " connect ssid=\"" + ap.ssid + "\" name=\"" + ap.ssid + "\""
      		};
      		connectToAPChain = ["loadProfile", "connect"];
      		var ERROR;
      		for (l = 0, len = connectToAPChain.length; l < len; l++) {
        	com = connectToAPChain[l];
        	exec(COMMANDS[com], function() {

      			exec("del \".\\" + ap.ssid + ".xml\"", function(err, resp) 			{
	      
				ERROR = err;
			})
		})
		}
       var err = ERROR
       callback && callback(err);
	}
}


function win32WirelessProfileBuilder(ssid, security, key) {
    var profile_content;
    if (security == null) {
      security = false;
    }
    if (key == null) {
      key = null;
    }
    profile_content = "<?xml version=\"1.0\"?> <WLANProfile xmlns=\"http://www.microsoft.com/networking/WLAN/profile/v1\"> <name>" + ssid.plaintext + "</name> <SSIDConfig> <SSID> <hex>" + ssid.hex + "</hex> <name>" + ssid.plaintext + "</name> </SSID> </SSIDConfig>";
    switch (security) {
      case "wpa":
        profile_content += "<connectionType>ESS</connectionType> <connectionMode>auto</connectionMode> <autoSwitch>true</autoSwitch> <MSM> <security> <authEncryption> <authentication>WPAPSK</authentication> <encryption>TKIP</encryption> <useOneX>false</useOneX> </authEncryption> <sharedKey> <keyType>passPhrase</keyType> <protected>false</protected> <keyMaterial>" + key + "</keyMaterial> </sharedKey> </security> </MSM>";
        break;
      case "wpa2":
        profile_content += "<connectionType>ESS</connectionType> <connectionMode>auto</connectionMode> <autoSwitch>true</autoSwitch> <MSM> <security> <authEncryption> <authentication>WPA2PSK</authentication> <encryption>AES</encryption> <useOneX>false</useOneX> </authEncryption> <sharedKey> <keyType>passPhrase</keyType> <protected>false</protected> <keyMaterial>" + key + "</keyMaterial> </sharedKey> </security> </MSM>";
        break;
      default:
        profile_content += "<connectionType>ESS</connectionType> <connectionMode>manual</connectionMode> <MSM> <security> <authEncryption> <authentication>open</authentication> <encryption>none</encryption> <useOneX>false</useOneX> </authEncryption> </security> </MSM>";
    }
    profile_content += "</WLANProfile>";
    return profile_content;
}


 function execSync(command, options) {
      var results;
      if (options == null) {
        options = {};
      }
      results = execSyncToBuffer(command, options);
      if (!results.status) {
        return results.stdout;
      }
      throw {
        stderr: results.stderr
      }
 }

exports.connectToWifi = connectToWifi





