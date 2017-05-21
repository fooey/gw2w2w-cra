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
		.src('./src/index.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptionsDev).on('error', sass.logError))
		.pipe(rename({basename: 'app'}))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(output));
});
gulp.task('app:watch', function() {
	return gulp.watch('./src/**/*.scss', ['app:dev']);
});


gulp.task('bootstrap:dev', function() {
	return gulp
		.src('./src/bootstrap.scss')
		.pipe(sass(sassOptionsDev).on('error', sass.logError))
		.pipe(rename({basename: 'bootstrap'}))
		.pipe(gulp.dest(output));
});
gulp.task('bootstrap:watch', function() {
	return gulp.watch([
		'./src/bootstrap.scss',
		'./src/_custom.scss',
		'./src/_mixins.scss',
	], ['bootstrap:dev']);
});


gulp.task('watch:css', ['bootstrap:watch', 'app:watch']);
gulp.task('build:css', ['bootstrap:dev', 'app:dev']);
gulp.task('dev:css', ['watch:css', 'build:css']);
gulp.task('default', ['build:css']);



// function sassDev(input, outputFile) {
//     return gulp
//         .src(input)
//         .pipe(sass(sassOptionsDev).on('error', sass.logError))
//         .pipe(rename({basename: outputFile}))
//         .pipe(gulp.dest(output));
// }
