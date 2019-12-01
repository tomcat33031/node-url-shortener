'use strict';

var os = require( 'os' );

module.exports.nowInMilliseconds = function nowInMilliseconds() {
    return Date.now();
};

module.exports.getIpAddress = function getIpAddress() {
    var networkInterfaces = os.networkInterfaces();
    var keys = Object.keys(networkInterfaces);
    for (var x = 0; x < keys.length; ++x) {
        var netIf = networkInterfaces[keys[x]];
        for (var y = 0; y < netIf.length; ++ y) {
            var addr = netIf[y];
            if (addr.family === 'IPv4' && !addr.internal) {
                return addr.address;
            }
        }
    }
    return '0.0.0.0';
};

module.exports.isUndefined = function isUndefined(x) {
    return typeof x === 'undefined';
};
