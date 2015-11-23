var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

var config = {

  // App app javascript source
  appSrc: [
    'src/app/js/**/*.js'
  ],

  // App style source
  appStyleSrc: [
    'src/bower_components/bootstrap-sass/assets/stylesheets/*.scss',
    'src/app/sass/*.scss'
  ],

  // Dependencies
  libSrc: [
    'src/bower_components/jquery/dist/jquery.min.js',
    'src/bower_components/angular/angular.min.js',
    'src/bower_components/angular-route/angular-route.min.js',
    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js'
  ],

  // Define lib styles here
  libStyleSrc: [
    
  ],
  
  // Build paths
  cssout: 'build/app/css',
  jsout: 'build/app/js'

};

gulp.task('app-js', function() {
  return gulp.src(config.appSrc)
      .pipe(concat('app-bundle.js'))
      .pipe(gulp.dest(config.jsout))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.jsout));
});

gulp.task('app-css', function () {
  return gulp.src(config.appStyleSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style-bundle.css'))
    .pipe(gulp.dest(config.cssout))
    .pipe(minifyCss({
        keepSpecialComments: 0
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.cssout));
});

gulp.task('lib-js', function() {
  return gulp.src(config.libSrc)
      .pipe(concat('lib-bundle.js'))
      .pipe(gulp.dest(config.jsout))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.jsout));
});

gulp.task('lib-css', [], function () {
  return gulp.src(config.libStyleSrc)
   .pipe(concat('libstyle-bundle.css'))
   .pipe(gulp.dest(config.cssout))
   .pipe(minifyCss())
   .pipe(concat('libstyle-bundle.min.css'))
   .pipe(gulp.dest(config.cssout));
});

gulp.task('watch', function() {
  gulp.watch(config.appSrc, ['app-js']);
  gulp.watch(config.appStyleSrc, ['app-css']);
  gulp.watch(config.libSrc, ['lib-js']);
  gulp.watch(config.libStyleSrc, ['lib-css']);
});

//Set a default tasks
gulp.task('default', ['watch', 'app-js', 'app-css', 'lib-js', 'lib-css']);