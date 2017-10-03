var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(); // All the plugins defined in package.json

var src = './src'; // dossier de travail
var dist = './dist'; // dossier à livrer

gulp.task('css', function () {
  return gulp.src(src + '/sass/main.scss')
    .pipe(plugins.sass())
    .pipe(gulp.dest(dist + '/css/'));
});

gulp.task('html', function() {
    return gulp.src(src + '/html/**')
    .pipe(gulp.dest(dist + '/'));
});
