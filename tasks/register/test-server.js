module.exports = function (grunt) {
    grunt.registerTask('test-server', [
        'shell:dropTestDB',
        'shell:restoreTestDBDump',
        'execute:setTestDBConf',
        'mochaTest:test'
    ]);
};
