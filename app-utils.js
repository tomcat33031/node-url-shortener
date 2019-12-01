'use strict';

var config = require('./config');

module.exports.urlFromPath = function urlFromPath(urlPath) {
    return 'http://'+config.hostname+((config.port !== '80') ? ':'+config.port : '')+urlPath;
};

