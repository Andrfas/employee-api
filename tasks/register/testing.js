module.exports = function (grunt) {
    grunt.registerTask('testing', [
        // 'mochas:continious',
        'mongobin:restore_test',
        'execute:setTestDBConf',
        'mochaTest:test'
    ]);
};
