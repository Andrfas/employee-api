module.exports = function(grunt) {

    grunt.config.set('karma', {
        unit: {
            configFile: 'karma.conf.js',
        },
        //continuous integration mode: run tests once in PhantomJS browser.
        continious: {
            configFile: 'karma.conf.js',
            singleRun: true,
            // browsers: ['PhantomJS']
        }
    });

    grunt.loadNpmTasks('grunt-karma');
};
