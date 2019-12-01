'use strict';

var hasher = require('./hasher');
var redisClient = require('./redis-client');

var config = require('./config');
var counter = require('./counter');

module.exports.lengthen = function lengthen(hash, options, callback) {
    console.log('lengthen', hash);
    var id = hasher.decode(hash);
    redisClient.HGET(['r_entries', id], function(err, url) {
        if (!err && url) {
            console.log('HGET r_entries', id, '->', url);
            callback(url);
        }
        else {
            callback();
        }
    });
};

module.exports.shorten = function shorten(url, options, callback) {
    //if no protocol is specified apply default
    var splitUrl = url.split('://');
    if (splitUrl.length < 2) {
        url = config.assumeProtocol+'://'+url;
    }
    redisClient.HGET(['entries', url], function(err, id) {
        console.log('HGET entries', url, '->', id);

        var hash;
        if (!err && id) {
            // re-use existing shortened url
            id = parseInt(id, 10);
            hash = hasher.encode(id);
            console.log('Use existing', hash);
            callback(hash);
            return;
        }
        else {
            // this url has not been shortened before, so let's shorten it
            counter.get(function(err, count) {
                id = ++count;
                hash = hasher.encode(id);
                var multi = redisClient.multi();
                multi.HSET('entries', url, id);
                multi.HSET('r_entries', id, url);
                multi.SET('counter', count);
                multi.exec(function(err, replies) {
                    console.log(err, replies);
                    callback(hash);
                });
            });
        }
    });
};
