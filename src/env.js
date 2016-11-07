var util = require('util');

module.exports = util._extend(process.env, { LANG: "en", LC_ALL: "en", LC_MESSAGES: "en"});
