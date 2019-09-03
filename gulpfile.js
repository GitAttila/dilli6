var gulp = require('gulp');
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var imagemin = require('gulp-imagemin');
var imageminPngQuant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
// var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var browserSync = require('browser-sync');
var server = browserSync.create();
var webpack = require("webpack");
var webpackconfig = require("./webpack.config.js");
var webpackstream = require("webpack-stream");

var paths = {
    fonts: {
        src: './node_modules/@fortawesome/fontawesome-free/webfonts/**/*',
        dest: './website/temp/webfonts'
    },
    lightgalleryimgs: {
        src: './node_modules/lightgallery/dist/img/**/*',
        dest: './website/temp/img'
    },
    galleryfonts: {
        src: './node_modules/lightgallery/dist/fonts/**/*',
        dest: './website/temp/fonts'
    },
    styles: {
        src: './website/assets/scss/sitestyles.scss',
        dest: './website/temp/styles'
    },
    scripts: {
        src: './website/assets/js/*.*',
        dest: './website/temp/js'
    },
    images: {
        src: './website/assets/images/**/*.{png,jpg,jpeg,svg,gif,pdf}',
        dest: './dist/assets/images'
    },
    videos: {
        src: './website/assets/videos/**/*.{mp4,webm,ogv}',
        dest: './dist/assets/videos'
    },
    rootfiles: {
        src: './website/*.{txt,svg,png,ico,xml,webmanifest}',
        dest: './dist'
    },
    temp: {
        src: [
            './website/temp/**/*.*',
            '!./website/temp/js',
            '!./website/temp/js/**',
            '!./website/temp/styles',
            '!./website/temp/styles/**',
            ],
        dest: './dist/assets'
    }
};

function serve(done) {
    server.init({
        server: {
            baseDir: "./website"
        },
        port: 3000,
        notify: false
    });
    done();
}

function reload(done) {
    server.reload();
    done();
}

function previewDist(done) {
	server.init({
		server: {
			baseDir: "dist"
        },
        notify: false
    });
    done();
}

function clean() {
    return del(['./dist']);
}

function rootfiles() {
    return gulp.src(paths.rootfiles.src)
        .pipe(gulp.dest(paths.rootfiles.dest));
}

function tempFiles() {
    return gulp.src(paths.temp.src)
        .pipe(gulp.dest(paths.temp.dest));
}

function fonts() {
    return gulp.src(paths.fonts.src)
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(paths.fonts.dest));
}

function galleryfonts() {
    return gulp.src(paths.galleryfonts.src)
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(paths.galleryfonts.dest));
}

function lightgalleryimgs() {
    return gulp.src(paths.lightgalleryimgs.src)
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(paths.lightgalleryimgs.dest));
}

function images() {
    return gulp.src([paths.images.src])
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngQuant(),
                imageminJpegRecompress()
            ], {
                progressive: true,
                interlaced: true,
                multipass: true,
                verbose: true
            }
        ))
        .pipe(gulp.dest(paths.images.dest));
}

function videos() {
    return gulp.src(paths.videos.src)
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(paths.videos.dest));
}

function styles() {
    return gulp.src(paths.styles.src)
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'compressed' //compressed
            }).on('error', sass.logError)
        )
        .pipe(autoprefixer({
            grid: true
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest));
}

function serializefiles() {
    return gulp.src("./website/index.html")
        .pipe(usemin({
            js: [function() { return rev(); } /*, function(){ return uglify();}*/ ],
            css: [function() { return rev(); }, function() { return cssnano(); }]
        }))
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./dist'));
}

function scripts() {
    return (
        gulp
        .src([paths.scripts.src])
        .pipe(plumber())
        .pipe(webpackstream(webpackconfig, webpack))
        // folder only, filename is specified in webpack config
        .pipe(gulp.dest(paths.scripts.dest))
        //.pipe(server.stream())
    );
}

function watch() {
    gulp.watch('./website/assets/js/**/*.js', gulp.series(scripts,reload));
    gulp.watch(paths.images.src, gulp.series(images, reload));
    gulp.watch('./website/assets/scss/**/*.scss',  gulp.series(styles, reload));
    gulp.watch('./website/*.html', reload);
}

var watch = gulp.series(serve, watch);

var preview = gulp.series(previewDist);

var build = gulp.series(clean, gulp.series(styles, scripts, rootfiles, fonts, galleryfonts, lightgalleryimgs, gulp.parallel(images, videos, tempFiles, serializefiles)));

exports.clean = clean;
exports.styles = styles;
exports.images = images;
exports.videos = videos;
exports.fonts = fonts;
exports.rootfiles = rootfiles;
exports.tempFiles = tempFiles;
exports.serializefiles = serializefiles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.preview = preview;

exports.default = build;