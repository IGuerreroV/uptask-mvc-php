import * as dartSass from "sass"; // Paquete de Sass utilizado para compilar Sass a CSS.

import { dest, series, src, watch } from "gulp"; // Proporciona funcionalidades de automatización de tareas en Gulp.

import gulpBabel from "gulp-babel"; // Permite compilar archivos JavaScript modernos a JavaScript compatible con versiones anteriores.
import gulpPlumber from "gulp-plumber";
import gulpSass from "gulp-sass"; // Permite compilar archivos Sass a CSS utilizando Gulp.
import imagemin from "gulp-imagemin";
import terser from "gulp-terser"; // Minifica archivos JavaScript para reducir su tamaño y mejorar el rendimiento.

const sass = gulpSass(dartSass);

const paths = {
	scss: "src/scss/**/*.scss",
	js: "src/js/**/*.js",
	img: "src/img/**/*",
};

export function css(done) {
	src(paths.scss, { sourcemaps: true })
		.pipe(gulpPlumber())
		.pipe(
			sass({
				outputStyle: "compressed",
				silenceDeprecations: ["legacy-js-api"],
			}).on("error", sass.logError),
		)
		.pipe(dest("./public/dist/css", { sourcemaps: "." }));
	done();
}

export function js(done) {
	src(paths.js, { sourcemaps: true })
		.pipe(gulpPlumber())
		.pipe(
			gulpBabel({
				presets: ["@babel/preset-env"],
			}),
		)
		.pipe(terser())
		.pipe(dest("./public/dist/js"));
	done();
}

export function img(done) {
	src(paths.img).pipe(imagemin()).pipe(dest("./public/dist/img"));
	done();
}

export function dev() {
	watch(paths.scss, css);
	watch(paths.js, js);
	watch(paths.img, img);
}

export default series(css, js, img, dev);
