'use strict';

import { stacksvg } from 'gulp-stacksvg';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

// CSS

function testStyles() {
    return gulp.src('app/sass/style.scss', { sourcemaps: true })
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/css'), { sourcemaps: '.' })
        .pipe(browserSync.stream())
}

function buildStyles() {
    return gulp.src('app/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css/components'))
}

// Images

function copyImages() {
    return gulp.src('app/images/*.{jpg,png,svg}')
        .pipe(gulp.dest('dist/images'))
}

// Svg stack

function makeStack() {
    return gulp.src('app/images/icons/test/*.svg')
        .pipe(stacksvg({ output: `sprite` }))
        .pipe(gulp.dest('dist/images/icons'))
}

function makeHeaderStack() {
    return gulp.src('app/images/icons/header/*.svg')
        .pipe(stacksvg({ output: `header` }))
        .pipe(gulp.dest('dist/images/icons'))
}

function makeMainStack() {
    return gulp.src('app/images/icons/header/*.svg')
        .pipe(stacksvg({ output: `main` }))
        .pipe(gulp.dest('dist/images/icons'))
}

// JS

function scripts() {
    return gulp.src('app/js/main.js')
        .pipe(plumber())
        .pipe(rename('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream())
}

// HTML

function html() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist/'))
}

// Browsersync and watcher

function watcher() {
    gulp.watch(['app/sass/**/*.scss'], testStyles)
    gulp.watch(['app/js/main.js'], scripts)
    gulp.watch(['app/*.html'], html).on('change', browserSync.reload)
}

function browsersync(done) {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
    done();
}

// Clean

function cleanDist() {
    return deleteAsync('dist');
}

// Gulp scripts

export const build = gulp.series(
    cleanDist,
    gulp.parallel(
        buildStyles,
        scripts,
        html,
        copyImages,
        makeHeaderStack,
        makeMainStack
    )
);

export default gulp.series(
    cleanDist,
    gulp.parallel(
        testStyles,
        scripts,
        html,
        copyImages,
        makeStack
    ),
    gulp.series(
        browsersync,
        watcher
    )
);

