/****** ------ ******
  General
****** ------ ******/

var gulp = require('gulp'),
    gutil = require('gulp-util');

/****** ------ ******
  Browsersync
****** ------ ******/

// Create a Browsersync instance.
var browserSync = require('browser-sync').create();

/****** ------ ******
  PostCSS
****** ------ ******/

// Create a PostCSS instance.
var postcss = require('gulp-postcss');

// PostCSS plugin to inline @import rules content.
var atImport = require('postcss-import');

// Use tomorrow’s CSS syntax, today.
var cssnext = require('postcss-cssnext');

// Use Sass-like markup in your CSS.
var precss = require('precss');

// A tool for packing same CSS media query rules into one with PostCSS.
var mqpacker = require('css-mqpacker');

// Compresses your css.
var cssnano = require('cssnano');

/****** ------ ******
  Tasks
****** ------ ******/

/* Create a task which call the tasks I want to execute when I use the gulp
serve command */
gulp.task('serve', ['watcher', 'browserSync', 'css']);

/* Create a task which will be watching every change of every file inside my
app */
gulp.task('watcher', ['browserSync', 'css'], function() {
  gulp.watch('public/**/*.css', ['css']);
  gulp.watch('public/**/*.html', browserSync.reload);
  gulp.watch('public/**/*.js', browserSync.reload);
});

// Create a task to enable Gulp to spin up a server using Browsersync
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: {
      target: "localhost:3000"
    }
  });
});

// Create a task to read a source CSS file and process it through PostCSS
gulp.task('css', function() {
  var plugins = [
    atImport,
    cssnext,
    precss,
    mqpacker,
    cssnano
  ];

  return gulp.src('public/stylesheets/src/main.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('public/stylesheets/dest'))
    .pipe(browserSync.reload({
      stream: true
    }));

    console.log('Something');
});
