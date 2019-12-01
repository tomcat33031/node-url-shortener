'use strict';

var redisClient = require('./redis-client');
var config = require('./config');

module.exports.initialise = function initialiseCounter(callback) {
    var multi = redisClient.multi();
    multi.GET('counter');
    multi.HLEN('entries');
    multi.exec(function(err, replies) {
        if (!err) {
            var c = parseInt(n, 10);
            if (isNaN(c)) {
                c = 0;
            }
            var n = replies[1];
            var counter = Math.max(Math.max(c, n), config.startingCounter);

            redisClient.SET('counter', counter);
            callback(err, counter);
        }
        else {
            callback(err);
        }
    });
};

module.exports.initialise(function(err, counter) {
    console.log('Counter starts at', counter);
}); //TODO wait till done before proceeding with rest

module.exports.get = function getCounter(callback) {
    redisClient.GET('counter', function(err, n) {
        if (!err) {
            var counter = parseInt(n, 10);
            if (isNaN(counter)) {
                module.exports.initialise(callback);
            }
            else {
                callback(err, counter);
            }
        }
        else {
            callback(err);
        }
    });
};
