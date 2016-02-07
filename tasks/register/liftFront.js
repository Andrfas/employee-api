module.exports = function (grunt) {
    grunt.registerTask('liftFront', [
        'compileAssets', 
        'linkAssets',
        'shell:liftAsync',
        'shell:runFront'
    ]);
};
