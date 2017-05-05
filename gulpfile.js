const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');


const output = './src/styles';

const sassOptionsDev = {
    errLogToConsole: true,
    outputStyle: 'expanded',
};



gulp.task('app:dev', function() {
    return gulp
        .src('./sass/app/index.scss')
    	.pipe(sourcemaps.init())
        .pipe(sass(sassOptionsDev).on('error', sass.logError))
        .pipe(rename({basename: 'app'}))
    	.pipe(autoprefixer())
    	.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(output));
});
gulp.task('app:watch', function() {
    return gulp.watch('./sass/app/**/*.scss', ['app:dev']);
});


gulp.task('bootstrap:dev', function() {
    return gulp
        .src('./sass/bootstrap/index.scss')
        .pipe(sass(sassOptionsDev).on('error', sass.logError))
        .pipe(rename({basename: 'bootstrap'}))
        .pipe(gulp.dest(output));
});
gulp.task('bootstrap:watch', function() {
    return gulp.watch('./sass/bootstrap/**/*.scss', ['bootstrap:dev']);
});


gulp.task('sass:dev', ['bootstrap:dev', 'app:dev']);
gulp.task('watch', ['bootstrap:watch', 'app:watch']);
gulp.task('default', ['watch', 'sass:dev']);



// function sassDev(input, outputFile) {
//     return gulp
//         .src(input)
//         .pipe(sass(sassOptionsDev).on('error', sass.logError))
//         .pipe(rename({basename: outputFile}))
//         .pipe(gulp.dest(output));
// }
