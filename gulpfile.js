var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var del = require('del');
var minifyImg = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var babel = require('gulp-babel');

gulp.task('watch', function() {
  browserSync.init({
    server: "./src"
  });
  gulp.watch("src/scss/**/*.scss", ['sass']);
  gulp.watch("src/js/**/*.js").on('change', browserSync.reload);
  gulp.watch("src/*.html").on('change', browserSync.reload);
})

gulp.task('sass', function() {
  return gulp.src("src/scss/*.scss")
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCss({
        format: 'beautify'
      }))
      .pipe(gulp.dest("src/css"))
      .pipe(browserSync.stream());
})

gulp.task('build', function() {
  // Remove old files
  del.sync('dist');

  // Minify css
  gulp.src("src/css/**/*.css")
    .pipe(cleanCss({compatibility : 'ie8'}))
    .pipe(gulp.dest('dist/assets/css'));

  // Minify Images
  gulp.src("src/images/*")
    .pipe(minifyImg())
    .pipe(gulp.dest('dist/assets/images'));

  // Minify Js
  gulp.src("src/js/**/*.js")
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'));

  // Change ref html
  gulp.src("src/*.html")
    .pipe(useref())
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['watch'])
