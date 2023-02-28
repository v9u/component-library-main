import {plugins,external} from './rollup.comon'
import path from 'path'
import typescript from 'rollup-plugin-typescript2'
const { noElPrefixFile } = require('./common')
const paths = function(id){
  if ((noElPrefixFile.test(id))) {
    let index = id.search(noElPrefixFile)
    return `./${id.slice(index)}`
  }
}
module.exports = [
    { 
        input: path.resolve(__dirname, '../packages/el/index.ts'),
        output: [
          {
            exports: 'auto', //默认导出
            file: 'dist/lib/index.esm.js',
            format: 'esm',
            paths
          },
          {
            exports: 'named', //默认导出
            file: 'dist/lib/index.cjs.js',
            format: 'cjs',
            paths
          }
        ],
        plugins: [
     
          ...plugins,
          typescript({
            tsconfigOverride: {
              'include': [
                'packages/**/*',
                'typings/vue-shim.d.ts',
              ],
              'exclude': [
                'node_modules',
                'packages/**/__tests__/*',
                'packages/**/stories/*'
              ],
            },
            abortOnError: false,
           
          }),
        ],
        external
    } 
]
