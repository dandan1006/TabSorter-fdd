var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8888,
            proxies: [{
                source: '/api/get/list',
                target: 'http://localhost:3000/api/get/list',
            }]
        }))
})
gulp.task('devScss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('devScss'));
})

gulp.task('dev', gulp.series('devScss', 'server', 'watch'))