var gulp        = require('gulp'),
    plumber     = require('gulp-plumber'),
    uglify      = require('gulp-uglify'),
    browserify  = require('browserify'),
    babel       = require('babel-core'),
    source       = require('vinyl-source-stream'),
    stylus      = require('gulp-stylus'),
    lost        = require('lost-stylus'),
    postcss     = require('gulp-postcss'),
    poststylus  = require('poststylus'),
    sourcemaps  = require('gulp-sourcemaps'),
    autoprefixer= require('autoprefixer'),
    mqpacker    = require('css-mqpacker'),
    rupture     = require('rupture'),
    nib         = require('nib'),
    normalize   = require('normalize'),
    browserSync = require('browser-sync').create();

gulp.task('styles', function () {
    return gulp.src('./src/stylus/*.styl')
        .pipe(plumber())
        .pipe( sourcemaps.init() )
        .pipe(stylus({
            use:[
                nib(), 
                rupture(), 
                lost(),
                normalize(),
                poststylus(['lost', 'autoprefixer', 'css-mqpacker', 'rucksack-css'])
            ],
            import: ['normalize', 'rupture','nib']}))  
        .pipe(sourcemaps.write('.'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({ stream: true }));;
}); 

gulp.task('js', function() {
     return browserify({entries: './src/js/script.js', extensions: ['.js'], debug: true})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js/'))
    
})

    // BrowserSync
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    notify: false
  });
  gulp.watch('**/*.html').on('change', browserSync.reload);
});
  
// Watch tasks
gulp.task('watch', function() {
  gulp.watch('./src/**/*.styl', ['styles']);
  gulp.watch('./src/**/*.js', ['js']);
//  gulp.watch('src/js/**/*.js', ['scripts']);
});
    



gulp.task('default', ['styles', 'js', 'watch']);