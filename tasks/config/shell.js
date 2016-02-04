module.exports = function(grunt) {

    grunt.config.set('shell', {
        lift: {
            command: 'sails lift'
        }
    });

    grunt.loadNpmTasks('grunt-shell');
};
