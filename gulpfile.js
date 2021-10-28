const { src, dest, series, parallel, watch } = require('gulp')
const pug = require('gulp-pug');
const sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Paths
const PATH_TEMPLATE = './src/templates/views/*.pug';
const PATH_STYLE = './src/styles/**/*.scss';
const PATH_SCRIPT= './src/app.js';

function views() {
    return src(PATH_TEMPLATE)
        .pipe(pug({
            doctype: 'html',
            pretty: true
        }))
        .pipe(
            dest('./dist')
        )
}

function style() {
    return src(PATH_STYLE)
        .pipe(sass({
            outpgulputStyle: 'expanded'
        }))
        .pipe(
            // Ruta de destino
            dest('./dist')
        );
}

function script() {
    return src(PATH_SCRIPT)
        .pipe(dest('./dist'))
}

function assets() {
    return src('./src/images/*')
        .pipe(dest('./dist/images'))
}

function listen() {
    watch(PATH_TEMPLATE, views);
    watch(PATH_STYLE, style);
}

// Static server with Browser-sync and watch style
function serversync() {
    browserSync.init({
        server: {
            watch: true,
            // baseDir: "./"
            baseDir: "./dist"
        }
    });
    watch(PATH_STYLE, style);
    watch(PATH_TEMPLATE, views);
    watch("./dist/css/style.css").on('change', browserSync.reload);
    watch("./dist/index.html").on('change', browserSync.reload);
}

exports.build = parallel(views, style, script, assets);
exports.listen = series(views, style, script, listen);
exports.develop = series(views, style, script, assets, serversync); // with browser-sync

/**
if(process.env.NODE_ENV === 'production') {
    exports.build = parallel(views, style, script);
} else {
    exports.develop = series(views, style, script, serversync);
}
*/
