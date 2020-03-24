const gulp = require("gulp");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

gulp.task("default", function() {
  return gulp
    .src("src/scripts/*.js")
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(gulp.dest("src/dist/"));
});
