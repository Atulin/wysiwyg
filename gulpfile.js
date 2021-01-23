'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
sass.compiler = require('sass');
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const Fiber = require('fibers');
const cond = require('gulp-if');
const browserSync = require('browser-sync').create();

// CSS processors
const autoprefixer = require('autoprefixer');
const mqpacker = require('@hail2u/css-mqpacker')
const nano = require('cssnano');

// JS processors
const terser = require('gulp-terser');

// Dirs
const dir = {
    cssroot : `./css`,
    jsroot  : `./js`,
}

// Watch globs
const watch = {
    sass: [ // Avoid `**` because gulp-sass shits itself otherwise and compilation takes >5s on any change
        `${dir.cssroot}/src/*.sass`,
        `${dir.cssroot}/src/elements/*.sass`,
    ],
    js: [
        `${dir.jsroot}/src/**/*.js`
    ]
}

// CSS tasks
gulp.task('css', () => {
    const processors = [
        autoprefixer,
        mqpacker,
        nano({ preset: 'default' })
    ];

    return gulp.src(`${dir.cssroot}/src/*.sass`)
        .pipe(sourcemaps.init())                // Init maps
        .pipe(sass({fiber: Fiber}))             // Compile SASS
        .pipe(gulp.dest(`${dir.cssroot}/dist`)) // Output the raw CSS
        .pipe(postcss(processors))              // Postprocess it
        .pipe(sourcemaps.write(`./`))           // Write maps
        .pipe(cond('**/*.css',                  // If it's a css file and not a map file
            rename({ suffix: '.min' })          // Add .min suffix
        ))
        .pipe(gulp.dest(`${dir.cssroot}/dist`))    // Output minified CSS
        .pipe(browserSync.stream())
});

gulp.task('watch:css', () => gulp.watch(watch.sass, gulp.series('css')));

// JS tasks
gulp.task('js', () => {
    return gulp.src([`${dir.jsroot}/src/**/*.js`])
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.init())
        .pipe(terser({
            mangle: {
                toplevel: false
            }
        }))
        .on('error', err => {
            console.error(err)
            this.emit('end')
        })
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${dir.jsroot}/dist`))
        .pipe(browserSync.stream());
});

gulp.task('watch:js', () => gulp.watch(watch.js, gulp.series('js')));

// Sync tasks
gulp.task('serve', () => {

    browserSync.init({
        server: "."
    });

    gulp.watch(watch.sass, gulp.series('css'));
    gulp.watch(watch.js, gulp.series('js'));
    gulp.watch("*.html").on('change', browserSync.reload);
});

// All tasks
gulp.task('all', gulp.parallel(['css', 'js']));
gulp.task('watch:all', gulp.parallel(['watch:css', 'watch:js', 'all']));
