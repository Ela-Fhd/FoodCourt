const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const pug = require("gulp-pug");

// copy fonts from src to dist ==>
gulp.task("copy-fonts", async function () {
  gulp
    .src("src/assets/fonts/css/*.css")
    .pipe(gulp.dest("dist/assets/fonts/css"));
  gulp
    .src("src/assets/fonts/webfonts/*")
    .pipe(gulp.dest("dist/assets/fonts/webfonts"));
});

// minify css
gulp.task("minify-css", async () => {
  gulp
    .src("src/assets/css/*.css")
    .pipe(rename("all.min.css"))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/assets/css"));
});

// minify js
gulp.task("minify-js", async () => {
  gulp
    .src("src/assets/js/*.js")
    .pipe(concat("all.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/assets/js"));
});

//minify images
gulp.task("minify-image", async () => {
  gulp
    .src("src/assets/image/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets/image"));
});

// complie pug to html
gulp.task("compile-pug", async () => {
  gulp.src("src/*.pug").pipe(pug()).pipe(gulp.dest("dist"));
});

// watch task
gulp.task("watch", () => {
  gulp.watch("src/*.pug", gulp.series("compile-pug"));
  gulp.watch("src/assets/fonts/css/*.css", gulp.series("copy-fonts"));
  gulp.watch("src/assets/css/*.css", gulp.series("minify-css"));
  gulp.watch("src/assets/js/*.js", gulp.series("minify-js"));
  gulp.watch("src/assets/image/*", gulp.series("minify-image"));
});

// default task
gulp.task(
  "default",
  gulp.parallel(
    "compile-pug",
    "minify-css",
    "minify-js",
    "minify-image",
    "copy-fonts",
    "watch"
  )
);
