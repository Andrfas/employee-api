module.exports = function (grunt) {
	grunt.registerTask('dev-test', [
        'compileAssets', 
        'linkAssets',
        'testing',
        'execute:setDevDBConf',
        'liftSails',
        'watch'
    ]);
};
