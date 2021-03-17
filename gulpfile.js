'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var ejs = require("gulp-ejs");
var cleanCSS = require('gulp-clean-css');
 
sass.compiler = require('node-sass');


function makeCss(){
  return gulp.src('./src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./www/css'));
}

function makePage(){
    return gulp.src("./src/pages/*.html")
    .pipe(ejs({}))
    .pipe(gulp.dest("./www"));
}

function watch(){

    browserSync.init({
        server: "./www"
    });

    gulp.watch("./src/pages/*.html", makePage);
    gulp.watch("./src/partials/*.html", makePage);
    gulp.watch("./src/scss/*.scss", makeCss);
    gulp.watch("./src/partials/**/*.scss", makeCss);
    gulp.watch("www").on('change', browserSync.reload);
}

module.exports.makeCss = makeCss;
module.exports.watch = watch;