var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var minify = require('gulp-minify');
var webserver = require('gulp-webserver');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var fileinclude = require('gulp-file-include');
var cleanCSS = require('gulp-clean-css');

gulp.task('default', ['compresspug', 'sass', 'minify-css', 'compressjs', 'imagemin', 'combine_html', 'webserver'], function() {
  gulp.watch('src/SASS/*.sass', ['sass']);
  gulp.watch('src/SCSS/*.scss', ['scss']);
  gulp.watch('src/CSS/*.css', ['minify-css']);
  gulp.watch('src/views/course/*.pug', ['compresspug', 'combine_html']);
  gulp.watch('src/JS/*/*.js', ['compressjs']);
  gulp.watch('src/JS/*.js', ['compressjs']);
  gulp.watch('src/views/*/*.html', ['combine_html']);
  gulp.watch('src/views/index.html', ['combine_html']);
});

gulp.task('compresspug', function buildHTML() {
  return gulp.src('src/views/course/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./src/views/course'))
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }));
});

// gulp.task('html', function () {
//     return gulp.src(['./src/views/**/*.html'])
//     .pipe(fileinclude())
//     .pipe(gulp.dest('./dist/views'));
// });

gulp.task('combine_html', function () {
    return gulp.src('./src/views/index.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('./'))
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }));
});

gulp.task('lint', function() {
  return gulp.src('src/JS/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }));
});

gulp.task('imagemin', function () {
  gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }));
});

gulp.task('sass', function () {
  return gulp.src('src/SASS/*.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/CSS/course'))
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }));
});


gulp.task('scss', function() {
	return gulp.src('src/SCSS/*.scss')
	    // .pipe(changed('dist/css', {extension:'.css'}))
	    .pipe(sass())
	    .pipe(gulp.dest('dist/CSS'))
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        }));
});

// Task to minify css using package cleanCSs
gulp.task('minify-css', () => {
     // Folder with files to minify
     return gulp.src(['src/CSS/**/*.css', 'src/CSS/*.css'])
     //The method pipe() allow you to chain multiple tasks together
     //I execute the task to minify the files
    .pipe(cleanCSS())
    //I define the destination of the minified files with the method dest
    .pipe(gulp.dest('dist/CSS'))
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }));
});

gulp.task('compressjs', function() {
  gulp.src(['src/JS/*.js', 'src/JS/**/*.js'])
    .pipe(minify({}))
    .pipe(gulp.dest('dist/JS'))
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    }));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true
    }));
});
