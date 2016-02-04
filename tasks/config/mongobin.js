module.exports = function(grunt) {

    grunt.config.set('mongobin', {
        options: {
            host: 'localhost',
            port: '27017',
            db: 'employeeDB_TEST'
        },
        restore_test: {
            task: 'restore',
            path: './test/mongo_dump/employeeDB_TEST',
            drop: true
        },
        dump: {
            // if task is unspecified, mongobin will attempt to use the target key,
            // in this case, 'dump'.
            out: './dump/' + Date.now()
        }

    });

    grunt.loadNpmTasks('grunt-mongo-bin');
};
