const gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('server', function () {
    nodemon({
        script: './src/index.js'
    });
});

gulp.task('default', ['server']);