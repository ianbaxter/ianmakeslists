const gulp = require("gulp");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");

gulp.task("imagemin", () => {
  return gulp.src("src/img/*").pipe(imagemin()).pipe(gulp.dest("src/imgmin"));
});

gulp.task("processJS", () => {
  return gulp
    .src("src/scripts/*.js")
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(gulp.dest("src/dist/"));
});

gulp.task("watch", function () {
  gulp.watch("src/scripts/*.js", gulp.series("processJS"));
  gulp.watch("src/img/*", gulp.series("imagemin"));
});
