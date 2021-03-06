var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify')
var watchify = require('watchify');
var vueify = require('vueify')
var source = require("vinyl-source-stream")
var globby = require('globby')
var buffer = require('vinyl-buffer');
var es = require('event-stream');
var path = require('path');

var fs = require('fs');

gulp.task('watch', function (done) {
    gulp.watch('./src/**/*.vue', { interval: 100 }, gulp.task('vue'));
    done();
});


// 初始化entry文件
gulp.task('init_entry', async function (done) {
    var entries = await globby('./src/**/*.vue');

    console.log(entries);
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];

        var entryTpl = `
var Vue = require('vue');
var App = require('${path.resolve(__dirname, entry)}');
Vue.config.devtools = true;
new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App);
    }
})
        `;

        var entryFile = entry.replace(/\.\/src/, './cache').replace('.vue', '.js');
        var entryDir = entryFile.replace(/\/[^/]*$/, '');

        await mkdir(entryDir);
        console.log(entryFile)

        await new Promise(function (resolve, reject) {
            fs.writeFile(entryFile, entryTpl, function (err) {
                if (err) return console.log(err);
                //console.log('写入成功')
                resolve();
            });
        });
    };
    done();
});



gulp.task('vue', async function (done) {
    var entries = await globby('./src/**/*.vue')

    var tasks = entries.map(function (entry) {

        var entryFile = entry.replace(/\.\/src/, './cache').replace('.vue', '.js');
        var outPath = entry.replace(/\.\/src/, './dist').replace(/\/[^.]\.vue$/, '');

        var outName = entry.match(/[\w-](?=\.vue)/)[0] + '.js';

        return browserify({
            entries: entryFile,
            debug: true
        })
            .transform(vueify)
            .bundle()
            .pipe(source(outName))
            .pipe(buffer())
            //.pipe(rename({ extname: '.bundle.js' }))
            .pipe(gulp.dest(outPath))
            .pipe(connect.reload());
    });

    return es.merge.apply(null, tasks);
});

gulp.task('copy_html', function (done) {

    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'));
    done();
});


gulp.task('server', function (done) {
    connect.server({
        port: 5050,
        root: './dist',
        livereload: true
    });
    done();
});

gulp.task('default', gulp.series(
    'init_entry',
    'vue',
    'copy_html',
    'server',
    'watch'
));

function mkdir(dir) {
    return new Promise(function (resolve, reject) {
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) throw err;
            resolve();
        });
    });
}