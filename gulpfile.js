var gulp = require('gulp');
var connect = require('gulp-connect');
var gulpVue = require('./gulp-vue')
var browserify = require('browserify')
var vueify = require('vueify')
var source = require("vinyl-source-stream")


var a = `

var Vue = require('vue');
var App = require('./a.vue');
Vue.config.devtools = true;
new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    }
})

`
var fs = require('fs');

var vueMain = './src/component/a/a.js';  // todo 将入口文件封装，因为都是一样的
gulp.task('vue', function (done) {
    return browserify({
        entries: vueMain,
        paths: './src/component/a',
        debug: true
    })
        .transform(vueify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('watch', function (done) {
    gulp.watch('./src/**/*.vue', { interval: 100 }, gulp.task('vue'));
    done();
});

gulp.task('default', gulp.series(
    'vue',
    'watch'
));
