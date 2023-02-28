const fs = require('fs')
const path = require('path')
const pkg = require('../dist/package.json')
const { noElPrefixFile } = require('./common')
const outsideImport = /import .* from '..\/(.*)/g
// global.d.ts  全局的ts类型定义
fs.copyFileSync(
    path.resolve(__dirname, '../typings/vue-shim.d.ts'),
    path.resolve(__dirname, '../dist/lib/el.d.ts'),
)

//设置一下版本号,不通过c-dhn-act的index.ts里导入json写入了  因为它是整体导出导入  所以会有一些其他冗余信息 不是js模块 无法摇树摇掉所以在这里写入版本
const getIndexUrl = url =>  path.resolve(__dirname, '../dist/lib', url)
const updataIndexContent = (indexUrl,content) => fs.writeFileSync(getIndexUrl(indexUrl), content.replace('independent',pkg.version))

['index.esm.js','index.cjs.js'].map(fileName => ({
  fileName,
  content:fs.readFileSync(getIndexUrl(fileName)).toString()
})).reduce((callback,item)=>{
  callback(item.fileName,item.content)
  return callback;
},updataIndexContent)


// component 这个方法主要是 针对打包之后 包做重命名处理 以及处理typings
const libDirPath = path.resolve(__dirname, '../dist/lib')
fs.readdirSync(libDirPath).forEach(comp => { //获取所有文件的名称
  if (!noElPrefixFile.test(comp)) { //如果不是特殊的文件夹，正则比文件信息查询快 在前面
    if (fs.lstatSync(path.resolve(libDirPath, comp)).isDirectory()) { //是文件夹
        if(comp === 'el'){ //如果是我们的整包  里面放的是.d.ts  补充类型声明
            fs.renameSync(
                // 把类型补充声明文件 剪切出来 和package.json 指定的 typings 对应
                path.resolve(__dirname, '../dist/lib', comp, 'index.d.ts'),
                path.resolve(__dirname, '../dist/lib/index.d.ts'),
            ) 
            fs.rmdirSync(path.resolve(__dirname, '../dist/lib/el'), { recursive: true })
            //移动完成 原来的文件就没用了删除掉
              
            // re-import 移过去之后 文件里面引用路径不对了 需要调整一下 原来引入的是button  而我们最后输出包名是 c-dhn-button 所以要修正一下
            const imp = fs.readFileSync(path.resolve(__dirname, '../dist/lib', 'index.d.ts')).toString()
            if(outsideImport.test(imp)) {
                const newImp = imp.replace(outsideImport, (i, c) => {
                  //i匹配到的字符串 import CDhnInput from '../input'
                  //c正则中子规则的匹配 inout
                  return i.replace(`../${c}`, `./el-${c.replace(/([A-Z])/g,"-$1").toLowerCase()}`) //修正引入包名
                })
               
                fs.writeFileSync(path.resolve(__dirname, '../dist/lib', 'index.d.ts'), newImp)
            }
            return;
        }
        //给我们的包改下名 方便后续的按需加载引入  
        const newCompName = `el-${comp.replace(/([A-Z])/g,"-$1").toLowerCase()}`
        fs.renameSync(
          path.resolve(libDirPath, comp),
          path.resolve(libDirPath, newCompName)
        ) 
    }
  }
})