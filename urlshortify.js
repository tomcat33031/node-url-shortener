'use strict';

var url = require('url');

var loadHandlers = require('./load-handlers');

var pathHandlers = [];
var defaultPathHandler;
var handlersForExport = {};
loadHandlers().forEach(function(handlers) {
    Object.keys(handlers).forEach(function(key) {
        var handler = handlers[key];
        if (typeof handler === 'function' && handler._info) {
            if (handler._info.path) {
                pathHandlers.push(handler);
                handlersForExport[handler._info.name] = handler;
            }
            else if (handler._info.isDefault) {
                defaultPathHandler = handler;
                handlersForExport[handler._info.name] = handler;
            }
        }
    });
});

var mainHandler = function mainHandler(req, res) {
    var params = url.parse(req.url, true);
    //simple routing by checking each path in array in sequence, falling back on a default handler if present
    var handled = false;
    for (var i = 0; i < pathHandlers.length; ++i) {
        var pathHandler = pathHandlers[i];
        if (pathHandler._info.path === params.pathname) {
            pathHandler(req, res, params);
            handled = true;
            break;
        }
    }
    if (!handled && defaultPathHandler) {
        defaultPathHandler(req, res, params);
        handled = true;
    }
    if (!handled) {
        res.writeHead(404);
        res.end();
    }
};
mainHandler.handlers = handlersForExport;

module.exports = mainHandler;
