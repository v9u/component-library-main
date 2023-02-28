module.exports = {
  // ATTENTION!!
  // Preset ordering is reversed, so `@babel/typescript` will called first
  // Do not put `@babel/typescript` before `@babel/env`, otherwise will cause a compile error
  // See https://github.com/babel/babel/issues/12066
  presets: [
    [
      '@babel/env', //babel转换es6 语法插件集合
    ],
    '@babel/typescript',  //ts
  ],
  plugins: [
    '@babel/transform-runtime', //垫片按需支持Promise,Set,Symbol等
    'lodash', 
    //一个简单的转换为精挑细选的Lodash模块，因此您不必这样做。
  //与结合使用，可以生成更小的樱桃精选版本！ https://download.csdn.net/download/weixin_42129005/14985899
  //一般配合lodash-webpack-plugin做lodash按需加载
  ],
  env: {
    utils: { //这个babel环境变量是utils 覆盖上述 的配置 这里暂时不会用 先注释掉
      presets: [
        [
          '@babel/env',
          {
            loose: true,//更快的速度转换
            modules: false,//不转换esm到cjs,支持摇树  这个上面不配置 不然esm规范会导致jest 测试编译不过
          },
        ],
      ],
      // plugins: [
      //   [
      //     'babel-plugin-module-resolver',
      //     {
      //       root: [''],
      //       alias: {
           
      //       },
      //     },
      //   ],
      // ],
    },
  },
}
