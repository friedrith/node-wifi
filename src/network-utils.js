var channels = {}

// cf [wlan channels frequency](https://en.wikipedia.org/wiki/List_of_WLAN_channels)

var frequency = 2412;

for (var i = 1; i < 15; i++) {
     channels[i] = frequency.toString();
     frequency = frequency + 5;
}

frequency = 5180;

for(var i = 36 ; i <= 64 ; i+=2){
    channels[i] = frequency.toString();
    frequency += 10;
}

frequency = 5500

for(var i = 100 ; i <= 144 ; i+=2){
    channels[i] = frequency.toString();
    frequency += 10;
}

frequency = 5745

for(var i = 149 ; i <= 161 ; i+=2){
    channels[i] = frequency.toString();
    frequency += 10;
}

frequency = 5825

for(var i = 165 ; i <= 173 ; i+=4){
    channels[i] = frequency.toString();
    frequency += 20;
}


function frequencyFromChannel(channelId) {
    return channels[parseInt(channelId)];
}

function dBFromQuality(quality) {
    return (parseFloat(quality)/2 - 100);
}


exports.frequencyFromChannel = frequencyFromChannel;
exports.dBFromQuality = dBFromQuality;
