'use strict';

var configSettings = require('./config-settings');

var hostname = process.env.HOSTNAME ||
    configSettings.hostname;
var port = process.env.PORT ||
    configSettings.port;
var isDebug = (process.env.IS_DEBUG === 'true') ||
    configSettings.isDebug;
var hashIdSalt = process.env.SALT ||
    configSettings.hashIdSalt;
var minLength = process.env.MIN_LENGTH;
minLength = parseInt(minLength, 10);
if (isNaN(minLength)) {
    minLength = configSettings.minLength;
}
var startingCounter = process.env.COUNTER;
startingCounter = parseInt(startingCounter, 10);
if (isNaN(startingCounter)) {
    startingCounter = configSettings.startingCounter;
}
var assumeProtocol = process.env.PROTOCOL ||
    configSettings.assumeProtocol;
var config = {
    hostname: hostname,
    port: port,
    isDebug: isDebug,
    hashIdSalt: hashIdSalt,
    minLength: minLength,
    startingCounter: startingCounter,
    assumeProtocol: assumeProtocol,
};

console.log('config', config);

module.exports = config;

