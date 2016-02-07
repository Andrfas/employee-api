module.exports = function (grunt) {
    grunt.registerTask('testServer', [
        'shell:dropTestDB',
        'shell:restoreTestDBDump',
        'execute:setTestDBConf',
        'mochaTest:test'
    ]);
};
