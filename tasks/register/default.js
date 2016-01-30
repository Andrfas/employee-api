module.exports = function (grunt) {
	grunt.registerTask('default', [
        'compileAssets', 
        'linkAssets',
        'testing',
        'watch'
    ]);
};
