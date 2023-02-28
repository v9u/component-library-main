
import json from '@rollup/plugin-json'
import vue from 'rollup-plugin-vue' //vue相关配置， css抽取到style标签中  编译模版
// import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'  //代码压缩
import { nodeResolve } from '@rollup/plugin-node-resolve'
import alias from 'rollup-plugin-alias';
const { noElPrefixFile } = require('./common')
const pkg = require('../package.json')

const isDev = process.env.NODE_ENV !== 'production'
const deps = Object.keys(pkg.dependencies)
// 公共插件配置
const plugins = [
    vue({
      // Dynamically inject css as a <style> tag 不插入
      css: false,
      // Explicitly convert template to render function
      compileTemplate: true,
      target: 'browser'
    }),
    json(), //json文件转换成es6模块
    nodeResolve(), //使用Node解析算法定位模块，用于解析node_modules中的第三方模块
    //大多数包都是以CommonJS模块的形式出现的，如果有需要使用rollup-plugin-commonjs这个插件将CommonJS模块转换为 ES2015 供 Rollup 处理
    // postcss({//和css集成 支持  组件库 不能使用  私有作用域css   不然提供给别人用时  覆盖起来太费劲
    //   // 把 css 插入到 style 中
    //   // inject: true,
    //   // 把 css 放到和js同一目录
    //   extract: true
    // }),
    alias({
      resolve: ['.ts', '.js','.vue','.tsx'],
      entries:{
        '@':'../packages'
      }
    })
  ]
  // 如果不是开发环境，开启压缩
isDev || plugins.push(terser())


function external(id) {
  return /^vue/.test(id)||
  noElPrefixFile.test(id)|| 
  deps.some(k => new RegExp('^' + k).test(id))
}
export {plugins,external};