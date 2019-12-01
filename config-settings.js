'use strict';
var utils = require('./utils');
//NOTE modify this file to configure your URL shortener

module.exports = {
    //In production, set this to your domain name (including subdomain, if any)
    //In development, just use your IP address, or "localhost".
    //Default: <detect IP address>
    hostname: utils.getIpAddress(),

    //The port number which this server should accept HTTP requests from
    //In production, this should be set to 80
    //In development, any number larger than 1000 is fine
    //Default: 8080
    port: '8080',


    //In production, set this to false
    //In development, this will expose a debug route handler that is useful for diagnostics
    //Default: true
    isDebug: true,



    //The salt used in the hashing functions used to encode/ decode the short URLs
    //Default: "hashids salt"
    hashIdSalt: 'hashids salt',


    //The mimimum length of the short URLs
    //Default: 6
    minLength: 6,


    //Where the starting counter should begin
    //Default: 0
    startingCounter: 0,


    //When the user does not specify a protocol for a long URL, assume this
    //e.g. If set to "http", user tries to shorten "bguiz.com", the long URL is understood to be "http://bguiz.com"
    //Default: "http"
    assumeProtocol: 'http',
};
