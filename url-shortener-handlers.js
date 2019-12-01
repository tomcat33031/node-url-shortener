'use strict';

var url = require('url');

var urlShortener = require('./url-shortener');
var redisClient = require('./redis-client');
var pageTemplates = require('./page-templates');
var utils = require('./utils');
var appUtils = require('./app-utils');
var config = require('./config');
var debug = require('./debug');

module.exports.handleShorten = function handleShorten(req, res, params) {
    if (!params) {
        params = url.parse(req.url, true);
    }
    urlShortener.shorten(params.query.url, {}, function(hash) {
        if (hash) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            var shortUrl = appUtils.urlFromPath('/'+hash);
            console.log('handleShorten shortUrl', shortUrl);
            res.end(pageTemplates.new_ok({
                title: 'URL shortener - Short URL',
                longUrl: params.query.url,
                shortUrl: shortUrl,
            }));
        }
        else {
            res.writeHead(404);
            res.end();
        }
    });
};
module.exports.handleShorten._info = {
    name: 'shorten',
    path: '/new',
};

module.exports.handleLengthenImpl = function handleLengthenImpl(hash, res) {
    urlShortener.lengthen(hash, {}, function(url) {
        if (url) {
            res.writeHead(302, { Location: url });
        }
        else {
            res.writeHead(404);
        }
        res.end();
    });
};
module.exports.handleLengthenImpl._info = {
    path: null,
};

module.exports.handleLengthen = function handleLengthen(req, res, params) {
    if (!params) {
        params = url.parse(req.url, true);
    }
    if (params.pathname.length <= config.minLength) {
        res.writeHead(404);
        res.end();
        return;
    }
    var hash = params.pathname.slice(1);
    if (config.showAds) {
        var viewUrl = appUtils.urlFromPath('/view?q='+hash);
        res.writeHead(302, { Location: viewUrl });
        res.end();
        return;
    }
    module.exports.handleLengthenImpl(hash, res);
};
module.exports.handleLengthen._info = {
    name: 'lengthen',
    path: undefined,
    isDefault: true,
};

module.exports.handleHome = function handleHome(req, res, params) {
    if (!params) {
        params = url.parse(req.url, true);
    }
    redisClient.HLEN('entries', function(err, num) {
        if (!err) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(pageTemplates.home_ok({
                title: 'URL shortener - Home',
                num: num,
            }));
        }
        else {
            //Even when we do not find the total number, we do not return a 404
            //as this simply indicates that no URLs have been shortened yet!
            //Defer outputting something else to the template
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(pageTemplates.home_ok({
                title: 'URL shortener - Home'
            }));
        }
    });
};
module.exports.handleHome._info = {
    name: 'home',
    path: '/',
};

module.exports.handleDebug = function handleDebug(req, res, params) {
    if (!params) {
        params = url.parse(req.url, true);
    }
    debug.debug(function(err, data) {
        if (!err) {
            res.writeHead(200, { 'Content-Type': 'text/text' });
            res.end(JSON.stringify(data, null, '\t'));
        }
        else {
            res.writeHead(404);
            res.end();
        }
    });
};
module.exports.handleDebug._info = {
    name: 'debug',
    path: '/debug',
};
