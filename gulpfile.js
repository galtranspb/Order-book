"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var del = require("del");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename")
var server = require("browser-sync").create();
var run = require("run-sequence");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");

gulp.task ("clean", function () {
  return del("build");
});

gulp.task ("copy", function() {
  return gulp.src ([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/*.{svg,jpeg}",
    "source/js/**"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
})

gulp.task("style", function () {
  gulp.src("source/sass/style.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest("build/css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
})

gulp.task("compress", function () {
  gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("build/js/"));
})

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "html",
    "compress",
    done
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]);
  gulp.watch("source/js/*.js");
});
