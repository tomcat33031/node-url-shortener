var fs = require('fs');

var jade = require('jade');

//NOTE these temapltes do *not* render anything presently.
//Create jade templates for them if you wish, for custom 404s
['view_notfound', 'skip_notfound'].forEach(function(templatename) {
    module.exports[templatename] = function() {
        return;
    };
});

//find all files named ./jade-templates/*.jade
//compile them into hjade functions and export them by the same name as functions on this module
var templateFolder = './jade-templates/';
fs.readdirSync(templateFolder).forEach(function(file) {
    var filename = templateFolder+file;
    var stat = fs.statSync(filename);
    if (!stat.isDirectory() && (file.split('.').pop() === 'jade')) {
        var templatename = file.split('.').slice(0,-1);
        module.exports[templatename] = jade.compileFile(filename);
    }
});
