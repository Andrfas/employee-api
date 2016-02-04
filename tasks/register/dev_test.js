module.exports = function (grunt) {
	grunt.registerTask('dev_test', [
        'compileAssets', 
        'linkAssets',
        'testing',
        'execute:setDevDBConf',
        'liftSails',
        'watch'
    ]);
};
