const fs = require('fs');
const execFile = require('child_process').execFile;
const env = require('./env');
const scan = require('./windows-scan');
const path = require('path');
const os = require('os');
const profileFilename = path.join(os.tmpdir(), 'nodeWifiConnect.xml');

function execCommand(cmd, params) {
  return new Promise((resolve, reject) => {
    execFile(cmd, params, { env, shell: true }, (err, stdout, stderr) => {
      if (err) {
        // Add command output to error, so it's easier to handle
        err.stdout = stdout;
        err.stderr = stderr;

        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
}

function connectToWifi(config, ap, callback) {
  scan(config)()
    .then(networks => {
      const selectedAp = networks.find(network => {
        return network.ssid === ap.ssid;
      });

      if (selectedAp === undefined) {
        throw 'SSID not found';
      }

      fs.writeFileSync(
        profileFilename,
        win32WirelessProfileBuilder(selectedAp, ap.password)
      );
    })
    .then(() => {
      return execCommand('netsh', [
        'wlan',
        'add',
        'profile',
        `filename=${profileFilename}`
      ]);
    })
    .then(() => {
      const cmd = 'netsh';
      const params = [
        'wlan',
        'connect',
        `ssid="${ap.ssid}"`,
        `name="${ap.ssid}"`
      ];
      if (config.iface) {
        params.push(`interface="${config.iface}"`);
      }
      return execCommand(cmd, params);
    })
    .then(() => {
      return execCommand(`del ${profileFilename}`);
    })
    .then(() => {
      callback && callback();
    })
    .catch(err => {
      execFile(
        'netsh',
        ['wlan', 'delete', `profile "${ap.ssid}"`],
        { env },
        () => {
          callback && callback(err);
        }
      );
    });
}

function getHexSsid(plainTextSsid) {
  let i, j, ref, hex;

  hex = '';

  for (
    i = j = 0, ref = plainTextSsid.length - 1;
    ref >= 0 ? j <= ref : j >= ref;
    i = ref >= 0 ? ++j : --j
  ) {
    hex += plainTextSsid.charCodeAt(i).toString(16);
  }

  return hex;
}

function win32WirelessProfileBuilder(selectedAp, key) {
  let profile_content = `<?xml version="1.0"?> <WLANProfile xmlns="http://www.microsoft.com/networking/WLAN/profile/v1"> <name>${
    selectedAp.ssid
  }</name> <SSIDConfig> <SSID> <hex>${getHexSsid(
    selectedAp.ssid
  )}</hex> <name>${selectedAp.ssid}</name> </SSID> </SSIDConfig>`;

  if (selectedAp.security.includes('WPA2')) {
    profile_content += `<connectionType>ESS</connectionType> <connectionMode>auto</connectionMode> <autoSwitch>true</autoSwitch> <MSM> <security> <authEncryption> <authentication>WPA2PSK</authentication> <encryption>AES</encryption> <useOneX>false</useOneX> </authEncryption> <sharedKey> <keyType>passPhrase</keyType> <protected>false</protected> <keyMaterial>${key}</keyMaterial> </sharedKey> </security> </MSM>`;
  } else if (selectedAp.security.includes('WPA')) {
    profile_content += `<connectionType>ESS</connectionType> <connectionMode>auto</connectionMode> <autoSwitch>true</autoSwitch> <MSM> <security> <authEncryption> <authentication>WPAPSK</authentication> <encryption>TKIP</encryption> <useOneX>false</useOneX> </authEncryption> <sharedKey> <keyType>passPhrase</keyType> <protected>false</protected> <keyMaterial>${key}</keyMaterial> </sharedKey> </security> </MSM>`;
  } else {
    if (selectedAp.security_flags.includes('WEP')) {
      profile_content += `<connectionType>ESS</connectionType> <connectionMode>auto</connectionMode> <autoSwitch>true</autoSwitch> <MSM> <security> <authEncryption> <authentication>open</authentication> <encryption>WEP</encryption> <useOneX>false</useOneX> </authEncryption> <sharedKey> <keyType>networkKey</keyType> <protected>false</protected> <keyMaterial>${key}</keyMaterial> </sharedKey> </security> </MSM>`;
    } else {
      profile_content +=
        '<connectionType>ESS</connectionType> <connectionMode>manual</connectionMode> <MSM> <security> <authEncryption> <authentication>open</authentication> <encryption>none</encryption> <useOneX>false</useOneX> </authEncryption> </security> </MSM>';
    }
  }

  profile_content += '</WLANProfile>';
  return profile_content;
}

module.exports = config => {
  return (ap, callback) => {
    if (callback) {
      connectToWifi(config, ap, callback);
    } else {
      return new Promise((resolve, reject) => {
        connectToWifi(config, ap, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  };
};
