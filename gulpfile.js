var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

gulp.task('lint', function(){
    return gulp.src('js/src/main.js')
        .pipe(plugins.plumber())
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('js-dev', [/*'lint'*/], function(){
    return gulp.src('js/src/main.js')
        .pipe(plugins.plumber())
        .pipe(plugins.browserify({
            debug: true,
            transform: ['hbsfy']
        }))
        .pipe(plugins.concat('dist.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js-prod', [/*'lint'*/], function(){
    return gulp.src('src/main.js')
        .pipe(plugins.plumber())
        .pipe(plugins.browserify({
            debug: false,
            transform: ['hbsfy']
        }))
        .pipe(plugins.uglify())
        .pipe(plugins.concat('dist.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', function(){
    gulp.start('js-dev');
});


gulp.task('watch', function(){
    //gulp.watch('scss/**/*.scss', ['scss']);
    gulp.watch('js/src/**/*.js', ['js-dev']);
    gulp.watch('js/src/**/*.hbs', ['js-dev']);
});


gulp.task('serve', ['js-dev'], function(){
    browserSync({
        notify: false,
        server: ['.']
    });
    gulp.watch('**/*.html', [browserSync.reload]);
    gulp.watch('js/src/**/*.js', ['js-dev', browserSync.reload]);
    gulp.watch('js/src/**/*.hbs', ['js-dev', browserSync.reload]);
});
