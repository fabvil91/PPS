var gulp = require('gulp');
var uglify = require('gulp-uglify');
var server = require('gulp-server-livereload');
var bower = require('gulp-bower');
var concat = require('gulp-concat');

var src = {
  bower: 'bower.json'
}

gulp.task('bower', function() {
  return bower('./bower_components')
    .pipe(gulp.dest('app/lib/'))
});

gulp.task('watchBower', function() {
  gulp.watch(src.bower, ['bower']);
})

gulp.task('min', function() {
    gulp.src('app/scripts/**/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/dist/js'));
});

gulp.task('serve',['bower', 'watchBower'], function() {
  gulp.src('app')
    .pipe(server({
      port: 8123,
      defaultFile: 'index.html',
      livereload: true,
      // directoryListing: true,
      open: true
    }));
});
