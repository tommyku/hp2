var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');

gulp.task('jade', function(){
  gulp.src(['src/jade/**/*.jade'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(gulpif(argv.live, connect.reload()))
});

gulp.task('scss', function(){
  gulp.src(['src/sass/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(gulpif(argv.live, connect.reload()))
});

gulp.task('coffee', function(){
  return gulp.src('src/coffee/**/*.coffee')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        console.log(error);
        this.emit('end');
    }}))
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(gulpif(argv.live, connect.reload()))
});

gulp.task('static', function(){
  gulp.src(['vendor/**/*'], { base: 'vendor' })
    .pipe(gulp.dest('./dist/'));
  gulp.src(['bower_components/**/*'], { base: 'bower_components' })
    .pipe(gulp.dest('./dist/bower_components'));
});

gulp.task('build', ['jade', 'scss', 'coffee', 'static']);

gulp.task('serve', function() {
  connect.server({
    root: 'dist',
    livereload: argv.live
  });
});

gulp.task('default', ['build', 'serve'], function(){
  gulp.watch("src/jade/**/*.jade", ['jade']);
  gulp.watch("src/sass/**/*.scss", ['scss']);
  gulp.watch("src/coffee/**/*.coffee", ['coffee']);
});
