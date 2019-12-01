var hashids = require('hashids');

var config = require('./config');

var hasher = new hashids(config.hashIdSalt, config.minLength);
module.exports = hasher;
