'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var ngAnnotate = require('gulp-ng-annotate');
var webserver = require('gulp-webserver');
var htmlmin = require('gulp-htmlmin');

var watcher = gulp.watch(['./src/js/**/*.js', './src/css/**/*.less', './src/images/**/*.jpg', './src/images/**/*.jpeg', './src/views/**/*.html', './src/js/directives/*.html','./src/*.html'], ['default']);
watcher.on('change', function( event ) {
        console.log('File ' + event.path + ' was ' + event.type + ' at ' + new Date() + ' , running tasks...');
});

gulp.task('compileLess', function(){
  return gulp.src('./src/css/**/*.less')
 	.pipe(less())
  .pipe(gulp.dest('./public'));
});

gulp.task('concatScripts', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('./public'))
});

gulp.task('images', function() {
  return gulp.src(['./src/images/**/*.jpg', './src/images/**/*.jpeg'])
      .pipe(gulp.dest('./public/images'));
});

gulp.task('html', function() {
    return gulp.src(['./src/views/**/*.html', './src/js/directives/*.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./public'))
});

gulp.task('index', function() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./public'))
});

gulp.task('webserver', function() {
  return gulp.src('SashasApp')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('default', ['compileLess', 'concatScripts', 'images', 'html', 'index']);
