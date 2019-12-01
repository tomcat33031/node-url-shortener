'use strict';

var redis = require('redis');

var config = require('./config');

var redisClient = redis.createClient();

module.exports = redisClient;
