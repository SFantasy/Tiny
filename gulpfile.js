/**
 *
 * gulpfile
 *
 * @description auto build JavaScript and Stylesheets for Tiny
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2014-11-14
 * @update 2014-11-15
 */

var gulp = require('gulp');

var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass');

var path = {
  scripts: 'src/coffee/*.coffee',
  sass: 'src/sass/*.sass',
  js: 'dist/js/*.js',
  css: 'dist/css/*.css'
};

gulp.task('default', ['scripts', 'sass']);

gulp.task('scripts', function () {
  gulp.src(paths.scripts)
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function () {
  gulp.src(path.sass)
    .pipe(sass({ style: 'compressed', noCache: true, sourcemap: true, sourcemapPath: '../sass' }))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build', ['scripts', 'sass'], function () {
  gulp.src(path.js)
    .pipe(uglify())
    .pipe(concat('tiny.min.js'))
    .pipe(gulp.dest('production'));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sass, ['sass']);
});
