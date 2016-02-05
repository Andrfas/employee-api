module.exports = function(grunt) {

    grunt.config.set('shell', {
        lift: {
            command: 'sails lift'
        },
        restoreTestDBDump: {
            command: 'mongorestore --db employeeDB_TEST --drop ./test/mongo_dump/employeeDB_TEST'
        },
        dropTestDB: {
            command: 'mongo employeeDB_TEST --eval "db.dropDatabase()"'
        }
    });

    grunt.loadNpmTasks('grunt-shell');
};
