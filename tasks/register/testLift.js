module.exports = function (grunt) {
	grunt.registerTask('testLift', [
        'compileAssets', 
        'linkAssets',
        'testServer',
        'execute:setDevDBConf',
        'liftSails'
    ]);
};
