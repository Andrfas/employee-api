module.exports = function(grunt) {


    grunt.config.set('mocha', {
        // Configure a mochaTest task
        // mochaTest: {
          testServer: {
            options: {
              reporter: 'spec',
              captureFile: 'results.txt', // Optionally capture the reporter output to a file
              quiet: false, // Optionally suppress output to standard out (defaults to false)
              clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
            },
            src: ['test/**/*.js']
          }
        }
    // });


    grunt.loadNpmTasks('grunt-mocha-test');
};
