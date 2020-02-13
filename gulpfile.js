const gulp = require('gulp');
const noop = require('gulp-noop');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel'); // Дополнительно установить @babel/core @babel/preset-env
const rollup = require('gulp-better-rollup'); // Дополнительно установить rollup@^1
const resolve = require('@rollup/plugin-node-resolve'); // Для подлкючегия библиотек из node.js
const commonjs = require('@rollup/plugin-commonjs'); // Для подключения библиотек из node.js (es5)
const mergeStream = require('merge-stream');
const browserSync = require('browser-sync');
const del = require('del');
const { argv } = require('yargs');

gulp.task('clean', () => del('dist/**/*'));

gulp.task('build:css', () => {
  return gulp.src('src/video-player.css')
    .pipe(maps('init'))
    .pipe(autoprefixer())
    .pipe(maps('write', '.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:js', () => {
  return gulp.src('src/jquery.video-player.js')
    .pipe(maps('init'))
    .pipe(rollup({
      external: ['jquery'], // Указывает jquery внейшней библиотекой и не подключает ее
      plugins: [
        resolve(), // Чтобы подключать сторонние библиотеки из node.js через import
        commonjs(), // Чтобы подключать сторонние библиотеки из node.js через require
      ],
    }, {
      format: 'iife',
      globals: { jquery: '$' },
      interop: false, // Убирает лишнюю проверку
    }))
    .pipe(babelify())
    .pipe(maps('write', '.')) // Если не указывать путь для файла sourcemap тогда он будет добавлен в js-файл
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', gulp.series(
  'clean',
  'build:css',
  'build:js'
));

gulp.task('build', gulp.series('dev', () => {
  const stream1 = gulp.src('dist/video-player.css')
    .pipe(maps('init'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(maps('write', '.')) 
    .pipe(gulp.dest('dist'));

  const stream2 = gulp.src('dist/jquery.video-player.js')
    .pipe(maps('init'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(maps('write', '.')) 
    .pipe(gulp.dest('dist'));

  return mergeStream(stream1, stream2);
}));

gulp.task('watch', gulp.series('dev', () => {
  browserSync.init({
    open: false,
    notify: true,
    server: { baseDir: './' },
  });

  gulp.watch('**/*.html')
    .on('change', browserSync.reload);

  gulp.watch('src/**/*.css')
    .on('change', () => {
      return getTaskFn('build:css')
        .pipe(browserSync.reload({ stream: true }));
    });

  gulp.watch('src/**/*.js')
    .on('change', gulp.series('build:js'));
}));

function maps(method, ...args) {
  return argv.maps ? sourcemaps[method](...args) : noop();
}

function babelify() {
  return argv.babel ? babel({ presets: ['@babel/preset-env'] }) : noop();
}

function getTaskFn(taskName) {
  return gulp.registry().get(taskName).unwrap()();
}