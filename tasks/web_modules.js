/*
 * grunt_web_modules
 * https://github.com/Philipp-Werminghausen/grunt_web_modules
 *
 * Copyright (c) 2015 Philipp Werminghausen
 * Licensed under the MIT license.
 */

    'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('web_modules', 'Self contained web-modules(templates/partials) (html-css-js-other)', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            // Concat specified files.
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                // Read file source.
                return grunt.file.read(filepath);
            }).join(grunt.util.normalizelf(options.separator));

            // Handle options.
            src += options.punctuation;

            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });
    grunt.registerMultiTask('new_module', 'Create ground structure of a web-module', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var mkdirp = require('mkdirp');
        var options = this.options({
            name:grunt.option('name') || "new_module"
        });
        console.log(this.files);
        var dist = this.files[0].dest  + '/' + options.name;

        mkdirp( dist, function(err) {
            console.log('Failed to create folder ' + options.name);
        });
        for (var i = this.files[0].orig.src.length - 1; i >= 0; i--) {
            mkdirp( dist + "/" + this.files[0].orig.src[i], function(err) {
            console.log('Failed to create folder ' + this.files[0].orig.src[i]);
        });
        };
    });

};