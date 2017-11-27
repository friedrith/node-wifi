# Running tests

In order to run tests, the best way is to create a create a file *.env* at the
root directory of this repository (next to the file package.json) and add
environment variables like this:

```
WIFI_IFACE=<iface>
WIFI_SSID=<ssid>
WIFI_PASSWORD=<password> # put "" if you want an empty password.
```

See the module [dotenv](https://github.com/motdotla/dotenv) for the complete documentation
of the file *.env*.

Then start a test with command `node test/test-scan.js`
