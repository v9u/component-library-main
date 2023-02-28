import {plugins,external} from './rollup.comon'
import path from 'path'
import typescript from 'rollup-plugin-typescript2'

const { getPackagesSync } =  require('@lerna/project')

module.exports = getPackagesSync().filter(pkg => pkg.name.includes('@el')).map(pkg => {
  const name =  pkg.name.split('@el/')[1] //包名称
  return {
    input: path.resolve(__dirname, '../packages', name, 'index.ts'), //入口文件，形成依赖图的开始
    output: [ //出口  输出
      {
        exports: 'auto',
        file: path.join(__dirname, '../dist/lib', name, 'index.js'), //esm版本
        format: 'es',
      },
    ],
    plugins: [

      ...plugins,
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false, //不生成类型声明
          },
          'exclude': [
            'node_modules',
            '__tests__',
            'stories'
          ],
        },
        abortOnError: false,
      }),
    ],
    external
  }
})
