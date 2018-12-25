var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var minify = require('gulp-minify');
var webserver = require('gulp-webserver');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var fileinclude = require('gulp-file-include');

gulp.task('default', ['sass', 'compressjs', 'imagemin', 'lint', 'compresspug', 'html', 'webserver'], function() {
  gulp.watch('src/SCSS/*.sass', ['sass']);
  gulp.watch('src/views/*.pug', ['compresspug']);
  gulp.watch('src/JS/*.js', ['compressjs']);
});

gulp.task('compresspug', function buildHTML() {
  return gulp.src('src/views/CourseList/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./dist/views'))
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }));
});

gulp.task('html', function () {
    return gulp.src('./dist/views/index.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('./'));
});

gulp.task('lint', function() {
  return gulp.src('src/JS/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }));
});

gulp.task('imagemin', function () {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }));
});

gulp.task('sass', function () {
  return gulp.src('src/SCSS/*.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/CSS'))
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }));
});

gulp.task('compressjs', function() {
  gulp.src('src/JS/*.js')
    .pipe(minify({}))
    .pipe(gulp.dest('dist/JS'))
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});
