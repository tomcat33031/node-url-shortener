# URL shortify

A NodeJs server that allows you to run a simple URL shortening services

## Features

- User can submit a full URL and receive a short URL
- When visiting a short URL, user gets redirtected to the long URL
- If same URL is shortened multiple times, the short URL gets re-used
- Extremely fast shortening and lengthening
    - For the algorithms nerds:
        - O(1) time complexity for both insert and lookup
        - O(N) space complexity
- Easily extended, designed with flexibility in mind
    - No dependence on frameworks, such as express
    - Instead exposes a low level NodeJs HTTP handle function, which can be consumed by most NodeJs frameworks
    - Each feature is split into its own handler function, in case you wish to mix and match on your own
- Easy and felxible templating
    - Out of the box support for Jade templates
        - Just put them in `jade-templates/`, and they will be automatically compiled
        - Simply require `page-templates.js`, and this module exports temaplte functions whose names match the Jade files
    - This is completely optional, and you can use your own preferred engine

## Setting up

First, install some prerequisites:

- NodeJs and npm.
    - You should use NodeJs >= v0.10.29 && < v0.11.x
    - Follow [instructions here](http://nodejs.org/).
- Redis.
    - You should use Redis >= v2.8.16 && < 3.0.x
    - Follow [instructions here](http://redis.io/download).
- OpenSSL.
    - Should be preloaded on most systems, otherwise, follow [instructions here](https://www.openssl.org/related/binaries.html).
    - Run `openssl list-message-digest-algorithms` and ensure that MD5 is available

Next, in the folder where you have this module installed, run:

    npm install
    node run start

Lastly, visit [`http://0.0.0.0:8080/`](http://0.0.0.0:8080/) in your browser,
and you should be prompted with the main page, where you can shortend your first URL.

## Advanced usage

Say you already have your own NodeJs server,
and you do not wish to replace it with this one,
but rather simply handle a few extra routes for URL shortening.
That is certainly possible.

### For all features

If you wish to include all features,

    cp urlshortify ${EXISTING_PROJECT}/node_modules/
    #edit ${EXISTING_PROJECT}/package.json to include "urlshortify" in dependencies

Now you can use the main handler function by requiring it:

    var urlshortify = require('urlshortify');

Take reference from `server.js`.

### For individual features

Alternatively, you can use the individual handler functions,
if you wish to compose your routes with a higher level of specificity:

    var urlshortifyLength = require('urlshortify').lengthen;

## Configuration

Edit `config-settings.js` to change the settings for your URL shortener.
The settings are explained inline in comments.

When you start the server, check the console output.
It should print out a the configuration object, similar to:

    config { hostname: '10.1.1.1',
      port: '8080',
      isDebug: true,
      hashIdSalt: 'hashids salt',
      minLength: 6,
      startingCounter: 0,
      assumeProtocol: 'http' }

It is **strongly recommended** that when you deploy the app to production,
you should change your **hostname** to the domain which you are deploying to,
the **port** to `80`,
and the **hash salt** to something other than the default value.
The default values for the other configuration settings may be left as is for production.

Note that once deployed to production,
you should never change the value of the hash salt,
unless you are willing to invalidate all URLs that have been shortened prior.

## Author

Nguyen Truong Viet Anh (Andy)

- [tomcat33031](https://github.com/tomcat33031)

