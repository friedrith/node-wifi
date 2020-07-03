const channels = {};

// cf [wlan channels frequency](https://en.wikipedia.org/wiki/List_of_WLAN_channels)

let frequency = 2412;

for (var i = 1; i < 15; i++) {
  channels[i] = frequency.toString();
  frequency = frequency + 5;
}

frequency = 5180;

for (var j = 36; j <= 64; j += 2) {
  channels[j] = frequency.toString();
  frequency += 10;
}

frequency = 5500;

for (var k = 100; k <= 144; k += 2) {
  channels[k] = frequency.toString();
  frequency += 10;
}

frequency = 5745;

for (var l = 149; l <= 161; l += 2) {
  channels[l] = frequency.toString();
  frequency += 10;
}

frequency = 5825;

for (var m = 165; m <= 173; m += 4) {
  channels[m] = frequency.toString();
  frequency += 20;
}

function frequencyFromChannel(channelId) {
  return channels[parseInt(channelId)];
}

function dBFromQuality(quality) {
  return parseFloat(quality) / 2 - 100;
}

function qualityFromDB(db) {
  return 2 * (parseFloat(db) + 100);
}

exports.frequencyFromChannel = frequencyFromChannel;
exports.dBFromQuality = dBFromQuality;
exports.qualityFromDB = qualityFromDB;
