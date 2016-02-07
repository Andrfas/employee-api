module.exports = function (grunt) {
    grunt.registerTask('lift', [
        'compileAssets', 
        'linkAssets',
        'liftSails'
    ]);
};
