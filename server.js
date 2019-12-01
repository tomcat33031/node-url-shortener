'use strict';

var http = require('http');
var config = require('./config');
var urlshoritify = require('./urlshortify');

var server = http.createServer(urlshoritify);
server.listen(config.port, config.hostname);
