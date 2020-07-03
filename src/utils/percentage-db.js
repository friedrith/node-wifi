// cf [relation between quality and dB](https://www.netspotapp.com/what-is-rssi-level.html)

const percentageFromDB = db => 2 * (parseFloat(db) + 100);

const dBFromPercentage = quality => parseFloat(quality) / 2 - 100;

module.exports = {
  percentageFromDB,
  dBFromPercentage
};
