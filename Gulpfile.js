var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watch = require('gulp-watch');
var async = require('async');
var consolidate = require('gulp-consolidate');
var runTimestamp = Math.round(Date.now()/1000);



// COPY CHICO ASSETS
gulp.task('copy', function() {
  return gulp.src(['node_modules/chico/dist/ui/**/*', 'node_modules/chico/dist/assets/**/*'])
    .pipe(gulp.dest('./public/theme/assets'))
})

gulp.task('sass', function() {
    gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});
gulp.task('image', function() {
      return gulp.src('./app/image/**/*')
          .pipe(gulp.dest('./public/image'))
  })
gulp.task('js', function() {
   browserify('./app/js/main.js')
   .bundle()
   .on('error', function(e){
     gutil.log(e);
   })
   .pipe(source('bundle.js'))
   .pipe(gulp.dest('./public/js/dist'));
});

gulp.task('watch', function() {
    gulp.watch('./app/scss/*.scss', ['sass'])
    gulp.watch('./app/js/*.js', ['js'])
});
gulp.task('build',['image', 'sass', 'js']);
gulp.task('default', ['watch', 'build']);
