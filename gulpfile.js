'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); //run local dev server
var open = require('gulp-open'); //open url in web browser

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html', //in src directory, any file that has html extension
        dist: './dist'

    }
}

//start local dev server
gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

//open task depends on connect to run before it
gulp.task('open', ['connect'], function() {
    //get index.html, open it using the url in pipe(open())
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }))
});

//takes html from src path and places it into dist folder, reload browser
gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

//watches for changes to files in given directory, run task if changed
gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
});

gulp.task('default', ['html', 'open', 'watch']); //run 'gulp' to run html and open tasks