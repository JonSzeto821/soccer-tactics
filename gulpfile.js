const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');

//Minify Js
function jsMin(cb) {
  gulp.src('src/javascript/script.js')
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(gulp.dest('public/javascript'));
  cb();
}

//Optimize Images
function imageOpt(cb) {
  gulp.src('src/images/screenshots/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images/screenshots'));
  cb();
}

//Minify Sass
function sassMin(cb) {
  gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    // .pipe(cleanCSS())
    .pipe(gulp.dest('public/css'));
  cb();
}

gulp.task('minify', gulp.parallel(jsMin, sassMin));
gulp.task('image', gulp.parallel(imageOpt));

gulp.task('watch', () => {
  gulp.watch('src/scss/*.scss', gulp.series(sassMin));
});

// gulp.task('default', gulp.series('js', 'image'));
// exports.jsMin = jsMin;
// exports.imageOpt = imageOpt;
