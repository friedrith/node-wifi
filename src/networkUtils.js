var channels = {}

var frequency = 2412;

for (var i = 1; i < 15; i++) {
     channels[i] = frequency.toString();
     frequency = frequency + 5;
}

frequency = 5180;

for(var i = 36 ; i <= 64 ; i+=4){
    channels[i] = frequency.toString();
    frequency += 20;
}

frequency = 5500

for(var i = 100 ; i <= 144 ; i+=4){
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


