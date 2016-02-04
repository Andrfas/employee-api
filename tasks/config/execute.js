module.exports = function(grunt) {

    grunt.config.set('execute', {
        setTestDBConf: {
            call: function(grunt, options){
                var mod = require('../../config/connections.js').connections;
                mod.mode = 'test';
            }
        },
        setDevDBConf: {
            call: function(grunt, options){
                var mod = require('../../config/connections.js').connections;
                mod.mode = 'dev';
            }
        }
    });

    grunt.loadNpmTasks('grunt-execute');
};
