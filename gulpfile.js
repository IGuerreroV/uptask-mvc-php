import gulpSass from 'gulp-sass'; // Permite compilar archivos Sass a CSS utilizando Gulp.
import { src, dest, watch, series } from 'gulp'; // Proporciona funcionalidades de automatización de tareas en Gulp.
import terser from 'gulp-terser'; // Minifica archivos JavaScript para reducir su tamaño y mejorar el rendimiento.
import * as sass from 'sass'; // Paquete de Sass utilizado para compilar Sass a CSS.

const gulpSassInstance = gulpSass(sass);

const paths = {
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
};

export function css(done) {
  src(paths.scss, { sourcemaps: true })
    .pipe(gulpSassInstance({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', gulpSassInstance.logError))
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
