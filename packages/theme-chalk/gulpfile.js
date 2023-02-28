'use strict'
const { series, src, dest } = require('gulp')
//暂时不用series  目前就一个任务
const sass = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')

const noElPrefixFile = /(index|base|display)/   //改名 如果不是这几个加上c-dhn

function compile(){//编译器
    return src('./src/*.scss') //读取所有scss 创建可读流
    .pipe(sass.sync()) //管道 插入处理函数 同步编译 sass文件 
    .pipe(autoprefixer({ cascade: false })) //不启动美化 默认美化属性
    .pipe(cssmin()) //压缩代码
    .pipe(rename(function (path) {
        if(!noElPrefixFile.test(path.basename)) { //如果不是这些  给加前缀
          path.basename = `c-dhn-${path.basename}`
        }
      }))
    .pipe(dest('./lib')) //创建写入流 到管道  写入到
}


exports.build = compile