var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(); // All the plugins defined in package.json

// begin to clean
var sync = require('gulp-sync')(gulp);
const del = require('del');
//// end to clean

var src = './src'; // dossier de travail
var dist = './dist'; // dossier à livrer
var temp = './temp'; // temporary folder for intermadiate files (i.e. temporary javascript files).


gulp.task('sass', function() {
    return gulp.src(src + '/sass/main.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.sourcemaps.write('./maps'))
    //.pipe(plugins.cssbeautify({ indent: '  ' }))
    .pipe(gulp.dest(dist + '/css/'));
});

gulp.task('css-images', function() {
    return gulp.src(src + '/css/i/**')
    .pipe(gulp.dest(dist + '/css/i'));
});

gulp.task('css', sync.sync(['sass','css-images']));

gulp.task('html', function () {
  return gulp.src(src+'/html/pages/*.html')
    .pipe(plugins.nunjucksRender({
      path: [src+'/html/'] // String or Array
    }))
    .pipe(gulp.dest(dist));
});

// copy font files
gulp.task('fonts', function () {
  return gulp.src('src/fonts/*')
    .pipe(gulp.dest(dist + '/fonts'))
});

// copy images
gulp.task('img', function () {
  return gulp.src('src/img/*')
    .pipe(gulp.dest(dist + '/img'))
});

// Build Javascript code.
// 1. uglify the custom code
// 2. concat with all vendor libraries
gulp.task('js-minify', function () {
  return gulp.src(src + '/js/main.js')
    .pipe(plugins.uglify())
    .pipe(gulp.dest(temp + '/js/'));
});

gulp.task('js-concat', function() {
  return gulp.src([
 //   src + '/lib/jquery/jquery-1.11.3.min.js',
 //   src + '/lib/webfontloader/webfontloader.js',
    temp + '/js/main.js'] )
    .pipe(plugins.concat('main.min.js'))
    .pipe(gulp.dest(dist + '/js/'));
});

gulp.task('js-img-holder', function() {
    return gulp.src(src+'/lib/holder/holder.min.js')
    .pipe(gulp.dest(dist + '/js/'))
});

gulp.task('clean-temp', function() {
  del([temp]);
});

/*****************************************************************/
/* Babel and Browserify tests...                                 */
/***************************************************************** /
gulp.task('babel', function(){
  gulp.src(src + '/js/component.tabs.js')
    .pipe(plugins.babel({
      presets: ['env']
    }))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(temp))
});
/*
gulp.task('browserify', function(){
  gulp.src(src + '/main.js')
    .pipe(plugins.browserify({
      entries: './main.js',
      debug: true
    }))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(temp))
});
*/
//gulp.task('modules', gulpsync.sync(['babel', 'browserify']));

/*****************************************************************/


//gulp.task('js', sync.sync(['js-minify','js-concat','js-img-holder','clean-temp']));

gulp.task('js', function () {
  return gulp.src('src/js/*')
    .pipe(gulp.dest(dist + '/js'))
});

// build the entire toolkit
gulp.task('build', sync.sync(['html','css','js']));

// default task (used if you run gulp without parameters). Set to build task (full solution)
gulp.task('default', ['build']);

/***************************************************/
/* WATCH Tasks : Used during the development Tasks */
/***************************************************/

gulp.task('watch-html', function () {
  gulp.watch(src + '/html/**/*.html', ['html']);
});

gulp.task('watch-sass', function () {
  gulp.watch(src + '/sass/*.scss', ['sass']);
});

gulp.task('watch', function () {
  gulp.watch(src + '/**', ['build']);
});
