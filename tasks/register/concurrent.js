module.exports = function (grunt) {
    grunt.config.set('concurrent', {
            liftAndWatch: ['liftSails', 'watch']
        
    });

    grunt.loadNpmTasks('grunt-concurrent');
};

