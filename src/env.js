var util = require('util');

module.exports = util._extend(process.env, { LANG: "en_US.UTF-8", LC_ALL: "en_US.UTF-8", LC_MESSAGES: "en_US.UTF-8"});
