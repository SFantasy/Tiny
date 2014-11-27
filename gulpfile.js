/**
 *
 * gulpfile
 *
 * @description auto build JavaScript and Stylesheets for Tiny
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2014-11-14
 * @update 2014-11-23
 */

var gulp = require('gulp');

var coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename');

var paths = {
  scripts: 'src/coffee/*.coffee',
  sass: 'src/sass/*.sass',
  js: 'dist/js/*.js',
  tiny_sass: 'src/sass/tiny.sass'
};

gulp.task('default', ['scripts', 'sass']);

gulp.task('scripts', function () {
  gulp.src(paths.scripts)
    .pipe(coffee({ bare: true }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sass({ style: 'compressed', noCache: true, 'sourcemap=none': true }))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('dist/css'));
});

// Build files into production folder
gulp.task('build', ['scripts', 'sass'], function () {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('tiny.min.js'))
    .pipe(gulp.dest('production'));

  gulp.src(paths.tiny_sass)
    .pipe(sass({ style: 'compressed', noCache: true, 'sourcemap=none': true }))
    .on('error', function (err) { console.log(err.message); })
    .pipe(rename('tiny.min.css'))
    .pipe(gulp.dest('production'));
});

// Example
gulp.task('eg', ['build'], function () {
  gulp.src('production/tiny.min.js')
    .pipe(gulp.dest('examples/js'));

  gulp.src('production/tiny.min.css')
    .pipe(gulp.dest('examples/css'));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('watch-eg', function () {
  gulp.watch(paths.scripts, ['eg']);
  gulp.watch(paths.sass, ['eg']);
});
