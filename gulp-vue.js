// 引入插件需要的包
var through = require('through2');

var fs = require("fs")
var browserify = require('browserify')
var vueify = require('vueify')



// 定义gulp插件主函数
// prefix_text：调用插件传入的参数
module.exports = function gulp_prefix(prefix_text) {



    // 创建stream对象，每个文件都会经过这个stream对象
    var stream = through.obj(function (file, encoding, callback) {
        // 文件经过stream时要执行代码


        //console.log(file.contents.toString())


        browserify('./src/compoment/a.vue')
            .transform(vueify)
            .bundle()
            .pipe(function(a) {
                console.log(a);
            })





        file.contents = Buffer.from('hahaha');



        return callback(null, file);
    });

    // 返回stream对象
    return stream;
};