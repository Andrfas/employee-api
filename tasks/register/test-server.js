module.exports = function (grunt) {
    grunt.registerTask('test-server', [
        'mongobin:restore_test',
        'execute:setTestDBConf',
        'mochaTest:test'
    ]);
};
