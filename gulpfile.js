'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); //run local dev server
var open = require('gulp-open'); //open url in web browser
var browserify = require('browserify'); //bundle js
var reactify = require('reactify'); //transform JSX to JS
var source = require('vinyl-source-stream'); //use conventional text streams with gulp
var concat = require('gulp-concat'); //concat files
var lint = require('gulp-eslint'); //lint js files, including jsx!


var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html', //in src directory, any file that has html extension
        js: './src/**/*.js',
        images: './src/images/*',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
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

gulp.task('js', function() {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console)) //error show up in console
        .pipe(source('bundle.js')) //name of bundle
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css')) //bundle all css
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('lint', function() {
    return gulp.src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());

    //publish favicon
    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});

//watches for changes to files in given directory, run task if changed
gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
    gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']); //run 'gulp' to run html and open tasks