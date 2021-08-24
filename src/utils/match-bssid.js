const matchBssid = line =>
  line.match(
    /[A-F0-9]{2}\\:[A-F0-9]{2}\\:[A-F0-9]{2}\\:[A-F0-9]{2}\\:[A-F0-9]{2}\\:[A-F0-9]{2}/
  );

module.exports = matchBssid;
