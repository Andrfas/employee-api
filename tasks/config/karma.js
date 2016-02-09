module.exports = function(grunt) {

    grunt.config.set('karma', {
        unit: {
            configFile: 'karma.conf.js',
            singleRun: true,
        },
        //continuous integration mode: run tests once in PhantomJS browser.
        unitC: {
            configFile: 'karma.conf.js',
            singleRun: false,
            // background: true

            // browsers: ['PhantomJS']
        }
    });

    grunt.loadNpmTasks('grunt-karma');
};
