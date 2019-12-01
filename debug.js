'use strict';

var redisClient = require('./redis-client');
var config = require('./config');

module.exports.debug = function debug(callback) {
    if (!config.isDebug) {
        callback('Debug info not available', null);
        return;
    }
    var multi = redisClient.multi();
    multi.get('counter');
    multi.hgetall('entries');
    multi.hgetall('r_entries');
    if (config.showAds) {
        multi.hgetall('ads_viewing');
    }
    multi.exec(function(err, replies) {
        if (!err) {
            var out = {
                counter: replies[0],
                entries: replies[1],
                'r_entries': replies[2],
            };
            if (config.showAds) {
                out.ads_viewing = replies[3];
            }
            callback(err, out);
        }
        else {
            callback(err, null);
        }
    });
};
