module.exports = function (grunt) {
	grunt.registerTask('dev-test', [
        'compileAssets', 
        'linkAssets',
        'test-server',
        'execute:setDevDBConf',
        'liftSails',
        'watch'
    ]);
};
