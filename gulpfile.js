var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var connect = require('gulp-connect');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');

gulp.task('html', function(){
  gulp.src(['src/html/**/*.pug'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./docs'))
    .pipe(gulpif(argv.live, connect.reload()))
});

gulp.task('css', function(){
  gulp.src(['src/css/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./docs/css/'))
    .pipe(gulpif(argv.live, connect.reload()))
});

gulp.task('js', function(){
  return gulp.src('src/js/**/*.coffee')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        console.log(error);
        this.emit('end');
    }}))
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./docs/js/'))
    .pipe(gulpif(argv.live, connect.reload()))
});

gulp.task('static', function(){
  gulp.src(['vendor/**/*'], { base: 'vendor' })
    .pipe(gulp.dest('./docs/'));
  gulp.src(['bower_components/**/*'], { base: 'bower_components' })
    .pipe(gulp.dest('./docs/bower_components'));
});

gulp.task('build', ['html', 'css', 'js', 'static']);

gulp.task('serve', function() {
  connect.server({
    root: 'docs',
    livereload: argv.live
  });
});

gulp.task('default', ['build', 'serve'], function(){
  gulp.watch("src/html/**/*.pug", ['html']);
  gulp.watch("src/css/**/*.scss", ['css']);
  gulp.watch("src/js/**/*.coffee", ['js']);
});
