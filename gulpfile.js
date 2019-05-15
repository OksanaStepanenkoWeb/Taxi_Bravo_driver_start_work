const gulp              = require('gulp'),
    sass                = require('gulp-sass'),
    browserSync         = require('browser-sync').create(),
    concat              = require('gulp-concat'),
    uglify              = require('gulp-uglifyjs'),
    cssnano             = require('gulp-cssnano'),
    rename              = require('gulp-rename'),
    autoprefixer        = require('gulp-autoprefixer'),
    sourcemaps          = require('gulp-sourcemaps'),
    spritesmith         = require('gulp.spritesmith'),
    plumber             = require('gulp-plumber'),
    notify              = require("gulp-notify"),
    babel               = require('gulp-babel');

const dirs = {
    scss: 'assets/scss',
    csslibs: 'assets/css/libs',
    css: 'assets/css',
    es6: 'assets/es6',
    jslibs: 'assets/js/libs',
    js: 'assets/js'
};

gulp.task('browser-sync', () => {
	let files = [
		'*.html',
		'*.js',
		'*.css'
	];

	browserSync.init(files, {
		server: {
			baseDir: '.'
		},
		open: false,
		ghostMode: false
	});
});

gulp.task('sass', function () {
    return gulp.src(dirs.scss + '/**/*.+(scss|sass)')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: notify.onError((error) => {
                return {
                    title: 'Error',
                    message: error.message
                };
            })
        }))
        .pipe(sass())
        .pipe(autoprefixer(['last 50 versions']))
        .pipe(cssnano({
            zindex: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(dirs.css))
        .pipe(browserSync.stream({
            match: '**/*.css' +
            ''
        }));
});

gulp.task('css:libs', function () {
    return gulp.src(dirs.csslibs + '/**/*.css')
        .pipe(concat('libs.min.css'))
        .pipe(cssnano({
            zindex: false
        }))
        .pipe(gulp.dest(dirs.css));
});

gulp.task('es6', () => {
    return gulp.src(dirs.es6 + '/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: notify.onError((error) => {
                return {
                    title: 'Error',
                    message: error.message
                };
            })
        }))
        .pipe(babel({
            presets: ['es2015', 'babili']
        }))
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(dirs.js));
});

gulp.task('scripts', function () {
    return gulp.src(dirs.jslibs + '/**/*.js')
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.js));
});

gulp.task('watch', ['browser-sync', 'scripts', 'css:libs'], function () {
    gulp.watch(dirs.scss + '/**/*.+(scss|sass)', ['sass']);
    gulp.watch(dirs.es6 + '/**/*.js', ['es6']);
    gulp.watch(dirs.js + '/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);
