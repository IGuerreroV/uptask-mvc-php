import * as dartSass from 'sass'; // Paquete de Sass utilizado para compilar Sass a CSS.

import { dest, series, src, watch } from 'gulp'; // Proporciona funcionalidades de automatización de tareas en Gulp.

import gulpPlumber from 'gulp-plumber';
import gulpSass from 'gulp-sass'; // Permite compilar archivos Sass a CSS utilizando Gulp.
import terser from 'gulp-terser'; // Minifica archivos JavaScript para reducir su tamaño y mejorar el rendimiento.

const sass = gulpSass(dartSass);

const paths = {
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
};

export function css(done) {
  src(paths.scss, { sourcemaps: true })
    .pipe(gulpPlumber())
    .pipe(sass({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
    .pipe(dest('./public/dist/css', { sourcemaps: '.' }));
  done();
}

export function js(done) {
  src(paths.js, { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('./public/dist/js'));
  done();
}

export function dev() {
  watch(paths.scss, css);
  watch(paths.js, js);
}

export default series(css, js, dev);
